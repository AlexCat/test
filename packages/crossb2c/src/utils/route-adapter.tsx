import React from 'react'
import {
    useNavigate,
    useLocation,
} from 'react-router-dom'

// https://github.com/pbeshai/use-query-params/issues/108
/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
const RouteAdapter = ({ children }: { children: any }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const adaptedHistory = React.useMemo(
        () => ({
            replace(location: any) {
                navigate(location, { replace: true, state: location.state })
            },
            push(location: any) {
                navigate(location, { replace: false, state: location.state })
            },
        }),
        [navigate]
    )
    return children({ history: adaptedHistory, location })
}

export {
    RouteAdapter
}