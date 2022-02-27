import { jsx } from '@emotion/react'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from 'kit/error'
import { Login } from 'modules/login'

export function LoginScreen() {
    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error fill />
            )}
        >
            <div style={{ display: 'flex', minHeight: '50vh' }}>
                <Login />
            </div>
        </ErrorBoundary>
    )
}