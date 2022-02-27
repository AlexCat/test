import React from 'react'
import * as authEndpoints from './auth-endpoints'

import { FullPageLoader } from 'kit/full-page-loader'
import { queryClient } from 'utils/react-query-config'
import { useQuery, useMutation } from 'react-query'
import { MainGateway } from 'api/main-gateway'
import { notConcurrent } from 'utils'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const refreshTokenSynced = notConcurrent(authEndpoints.refreshToken)

const HOOK_STATUS = {
    IDLE: 'IDLE', // начальный стейт

    INITIAL_TRY_FAILED: 'INITIAL_TRY_FAILED', // не удалось получить токен или профиль через cookie
    INITIAL_TRY_SUCCESS: 'INITIAL_TRY_SUCCESS', // удалось получить токен и профиль через cookie

    LOGIN_TRY_FAILED: 'LOGIN_TRY_FAILED', // не удалось получить логин через пароль
    LOGIN_TRY_SUCCESS: 'LOGIN_TRY_SUCCESS', // удалось получить токен и профиль через пароль

    LOGOUT_TRY_SUCCESS: 'LOGOUT_TRY_SUCCESS', // удалось успешно выйти
    LOGOUT_TRY_FAILED: 'LOGOUT_TRY_FAILED', // не удалось выйти
}

function getInitialAuthInfo() {
    return {
        info: {
            hookStatus: HOOK_STATUS.IDLE,
            originError: null,
            httpCode: -1,
        },
        user: null,
        token: null,
        roles: []
    }
}

function AuthProvider(props) {
    const [authInfo, setAuthInfo] = React.useState(getInitialAuthInfo())

    const loginQuery = useMutation(({ x, from }) => {
        return from === 'bySberid' ? authEndpoints.login(x) : authEndpoints.loginByCode(x)
    }, {
        onSuccess({
            accessToken
        }) {
            const info = {
                hookStatus: HOOK_STATUS.LOGIN_TRY_SUCCESS,
                originError: null,
                httpCode: 200,
            }

            setAuthInfo(x => ({ ...x, token: accessToken, user: {}, info }))
        },
        onError(e) {
            const info = {
                hookStatus: HOOK_STATUS.LOGIN_TRY_FAILED,
                originError: e,
                httpCode: e?.status || -1,
            }

            setAuthInfo(x => ({ ...x, info }))
        }
    })

    const logoutQuery = useMutation(x => {
        return authEndpoints.logout()
    }, {
        onSuccess() {
            queryClient.clear()
            const logoutState = getInitialAuthInfo()
            logoutState.info.hookStatus = HOOK_STATUS.LOGOUT_TRY_SUCCESS
            setAuthInfo(logoutState)
        },
        onError(error) {
            const info = {
                hookStatus: HOOK_STATUS.LOGOUT_TRY_FAILED,
                originError: error,
                httpCode: error?.status || -1,
            }

            setAuthInfo(x => ({ ...x, info }))
        }
    })

    const updateToken = React.useCallback(async () => {
        try {
            const response = await refreshTokenSynced()
            setAuthInfo(x => ({ ...x, token: response.accessToken }))
            return response
        } catch (e) {
            setAuthInfo(x => (getInitialAuthInfo()))
            return null
        }
    }, [])

    const initialQuery = useQuery(['initialAuthQuery'], async () => {
        return authEndpoints.refreshToken()
    }, {
        retry: 0,
        enabled: authInfo.info.hookStatus !== HOOK_STATUS.LOGIN_TRY_SUCCESS && authInfo.info.hookStatus !== HOOK_STATUS.LOGOUT_TRY_SUCCESS && authInfo.info.hookStatus !== HOOK_STATUS.LOGIN_TRY_FAILED,
        onSuccess({
            id,
            login,
            accessToken
        }) {
            const info = {
                hookStatus: HOOK_STATUS.INITIAL_TRY_SUCCESS,
                originError: null,
                httpCode: 200,
            }

            setAuthInfo(x => ({ ...x, token: accessToken, user: { id, login }, info }))
        },
        onError(error) {
            const info = {
                hookStatus: HOOK_STATUS.INITIAL_TRY_FAILED,
                originError: error,
                httpCode: error?.status || -1,
            }

            setAuthInfo(x => ({ ...x, info }))
        }
    })

    if (initialQuery.status === 'loading') {
        return <FullPageLoader />
    }

    return (
        <AuthContext.Provider
            value={{
                ...authInfo,
                updateToken,
                loginBySberid: x => loginQuery.mutateAsync({ x, from: 'bySberid' }),
                loginByCode: x => loginQuery.mutateAsync({ x, from: 'byCode' }),
                loginIsLoading: loginQuery.isLoading,

                logout: logoutQuery.mutateAsync,
            }}
            {...props}
        />
    )
}

function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

function useClient() {
    const { token, updateToken } = useAuth()
    return React.useMemo(
        () => {
            return new MainGateway({
                baseUrl: window._env_.getEndpoint('api'),
                token,
                updateToken
            })
        },
        [token, updateToken]
    )
}

export { AuthProvider, useAuth, useClient }
