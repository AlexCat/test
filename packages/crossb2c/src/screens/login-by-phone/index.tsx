import { jsx } from '@emotion/react'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from 'kit/error'
import { LoginByPhone } from 'modules/login-by-phone'

export function LoginByPhoneScreen() {
    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error />
            )}
        >
            <div style={{ display: 'flex', minHeight: '50vh' }}>
                <LoginByPhone />
            </div>
        </ErrorBoundary>
    )
}