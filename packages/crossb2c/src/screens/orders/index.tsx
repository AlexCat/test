import { jsx } from '@emotion/react'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate } from 'react-router-dom'

import { routesList, redirectUrlKey } from 'routes/routes-list'
import { Error } from 'kit/error'
import { OrdersModule } from 'modules/orders'

export function OrdersScreen() {
    const redirectUrl = localStorage.getItem(redirectUrlKey)

    if (redirectUrl) {
        setInterval(() => {
            localStorage.removeItem(redirectUrlKey)
        }, 500)

        if (redirectUrl !== routesList.orders) {
            return <Navigate to={redirectUrl} />
        }
    }

    return (
        <ErrorBoundary
            FallbackComponent={() => (
                <Error fill />
            )}
        >
            <OrdersModule />
        </ErrorBoundary>
    )
}