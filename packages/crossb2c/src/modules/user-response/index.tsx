import styled from '@emotion/styled'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import { createSberSendUserInfoRedirectUrl } from 'kit/sber-id-button/helpers'
import { savePersonal } from 'context/auth-context/auth-endpoints'
import { Spinner } from 'kit/spinner'
import { routesList } from 'routes/routes-list'

import { StatusCard } from './dependencies/status-card'

const Frame = styled.div(({ theme }) => {
    return {
        width: '100%',
        minHeight: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        flexGrow: 1,
        marginTop: 24,
        marginBottom: 24
    }
})

function isValidQueryParams(sp: URLSearchParams) {
    return sp.has('code') && sp.has('state')
}

function UserResponse() {
    const location = useLocation()
    const { formatMessage } = useIntl()
    const navigate = useNavigate()

    const sp = new URLSearchParams(location.search)
    const isQueryParamsValid = isValidQueryParams(sp)

    const query = useQuery(
        [savePersonal.toString(), sp.get('code'), sp.get('state')],
        () => savePersonal({
            code: sp.get('code'),
            redirectUri: createSberSendUserInfoRedirectUrl(),
            state: sp.get('state')
        }),
        {
            enabled: isQueryParamsValid
        }
    )

    if (!isQueryParamsValid) {
        return (
            <Frame>
                <StatusCard
                    type='error'
                    text={formatMessage({ id: 'app.userResponse.notValidQueryErrorMessage' })}
                    onClick={() => {
                        navigate(routesList.sendUserInfo)
                    }}
                />
            </Frame>
        )
    }

    return (
        <Frame>
            {query.isLoading && (
                <Spinner
                    fill
                />
            )}
            {query.isSuccess && (
                <StatusCard
                    type='success'
                    title={query.data?.greetings}
                />
            )}
            {query.isError && (
                <StatusCard
                    type='error'
                    onClick={() => {
                        navigate(routesList.sendUserInfo)
                    }}
                />
            )}
        </Frame>
    )
}

export {
    UserResponse
}