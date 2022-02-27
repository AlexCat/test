import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from 'kit/error'
import { SendUserInfo } from 'modules/send-user-info'

export function SendUserInfoScreen() {
    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error fill />
            )}
        >
            <SendUserInfo />
        </ErrorBoundary>
    )
}