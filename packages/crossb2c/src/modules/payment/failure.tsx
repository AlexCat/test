import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { Spinner } from 'kit/spinner'
import { useClient } from 'context/auth-context'
import { routesList } from 'routes/routes-list'

import { PaymentStatusCard } from './dependencies/payment-status-card'

const Frame = styled.div(({ theme }) => {
    return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 24,
        gap: '1rem'
    }
})
function FailureModule() {
    const orderId = new URLSearchParams(useLocation().search).get('orderId') || ''
    const { trackingNumber } = useParams()
    const navigate = useNavigate()

    const client = useClient()
    const query = useQuery<HttpSuccessResponse<{}>, HttpErrorResponse>(
        [client.postPaymentStatus.toString(), orderId, 'fail'],
        () => client.postPaymentStatus(orderId || '', 'FAIL')
    )

    return (
        <Frame>
            {query.isLoading && (
                <Spinner
                    fill
                />
            )}
            {query.isSuccess && (
                <PaymentStatusCard
                    type='failure'
                    trackingNumber={trackingNumber!}
                    onClick={() => {
                        navigate(routesList.fns.createPaymentInfo(trackingNumber!))
                    }}
                />
            )}
            {query.isError && (
                <PaymentStatusCard
                    type='warning'
                    errorText={query.error?.response?.data.title}
                    trackingNumber={trackingNumber!}
                    onClick={() => query.refetch()}
                />
            )}
        </Frame>
    )
}

export {
    FailureModule
}