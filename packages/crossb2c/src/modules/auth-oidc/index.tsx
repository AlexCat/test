import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Error } from 'kit/error'
import { useAuth } from 'context/auth-context'
import { Spinner } from 'kit/spinner'
import { P } from 'kit/typography'
import { createSberAuthRedirectUrl } from 'kit/sber-id-button/helpers'

const Frame = styled.div(({ theme }) => {
    return {
        width: '100%',
        minHeight: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        [theme!.mq.small]: {
            marginTop: '10rem',
        }
    }
})

function isValidQueryParams(sp: URLSearchParams) {
    return sp.has('code') && sp.has('state')
}

function AuthOidc() {
    const theme = useTheme()
    const location = useLocation()
    const { loginBySberid } = useAuth()

    const [isError, setIsError] = React.useState(false)

    const sp = new URLSearchParams(location.search)
    const isQueryParamsValid = isValidQueryParams(sp)

    React.useEffect(() => {
        async function fn() {
            if (isQueryParamsValid) {
                try {
                    await loginBySberid({
                        code: sp.get('code'),
                        redirectUri: createSberAuthRedirectUrl(),
                        state: sp.get('state')
                    })
                } catch {
                    setIsError(true)
                }
            }
        }

        fn()
    }, [])

    return (
        <Frame>
            {!isError && isQueryParamsValid && (
                <Spinner
                    size={50}
                    color={theme.colors.color3}
                />
            )}
            {!isQueryParamsValid && (
                <P><FormattedMessage id='app.oidc.error' /></P>
            )}
            {isError && (
                <Error fill>
                    <FormattedMessage id='app.networkError' />
                </Error>
            )}
        </Frame>
    )
}

export {
    AuthOidc
}