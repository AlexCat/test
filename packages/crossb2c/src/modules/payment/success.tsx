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

function SuccessModule() {
    const orderId = new URLSearchParams(useLocation().search).get('orderId') || ''
    const { trackingNumber } = useParams()
    const navigate = useNavigate()

    const client = useClient()
    const query = useQuery<HttpSuccessResponse<any>, HttpErrorResponse>(
        [client.postPaymentStatus.toString(), orderId, 'success'],
        () => client.postPaymentStatus(orderId || '', 'SUCCESS')
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
                    type='success'
                    trackingNumber={trackingNumber!}
                    onClick={() => {
                        navigate(routesList.orders)
                    }}
                />
            )}
            {query.isError && (
                <PaymentStatusCard
                    type='warning'
                    trackingNumber={trackingNumber!}
                    errorText={query.error?.response?.data.title}
                    onClick={() => query.refetch()}
                />
            )}
        </Frame>
    )
}

export {
    SuccessModule
}