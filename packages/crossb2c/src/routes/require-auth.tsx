import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from 'context/auth-context'
import { routesList, redirectUrlKey } from 'routes/routes-list'

function RequireAuth({ children }: { children: JSX.Element }) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        if (location.pathname) {
            setInterval(() => {
                localStorage.setItem(redirectUrlKey, location.pathname)
            }, 500)
        }

        return <Navigate to={routesList.login} state={{ from: location }} />
    }

    return children
}

function OnlyAnonymous({ children }: { children: JSX.Element }) {
    const { user } = useAuth()
    const location = useLocation()

    if (user) {
        return <Navigate to={routesList.orders} state={{ from: location }} />
    }

    return children
}

export {
    RequireAuth,
    OnlyAnonymous
}