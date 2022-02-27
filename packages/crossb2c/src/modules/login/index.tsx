import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'

import { routesList } from 'routes/routes-list'
import { Card, CardContent } from 'kit/card'
import { Input } from 'kit/input'
import { Button } from 'kit/button'
import { H4, P } from 'kit/typography'
import { SberIdButton } from 'kit/sber-id-button'
import { createSberAuthRedirectUrl } from 'kit/sber-id-button/helpers'

const Frame = styled.div(({ theme }) => {
    return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function Login() {
    const navigate = useNavigate()
    return (
        <Frame>
            <Card style={{ maxWidth: 370, width: 'calc(100% - 48px)', marginBottom: 12, marginTop: 12 }}>
                <CardContent style={{
                    paddingTop: 24,
                    paddingBottom: 24,
                    alignItems: 'center'
                }}>
                    <H4 style={{ textAlign: 'center' }}>
                        <FormattedMessage id='app.welcome' />
                    </H4>
                    <div style={{ height: 48 }} >
                        <SberIdButton
                            redirectUri={createSberAuthRedirectUrl()}
                        />
                    </div>
                    <Button
                        intent='warning'
                        style={{ marginTop: 16, width: 206 }}
                        onClick={() => navigate(routesList.loginByPhone)}
                    >
                        <FormattedMessage id='app.login.byPhone' />
                    </Button>
                </CardContent>
            </Card>
        </Frame>
    )
}

export {
    Login
}