import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'

import { H1 } from 'kit/typography'
import { Error } from 'kit/error'
import { Spinner } from 'kit/spinner'
import { queryName } from 'api/query-name'
import { useClient } from 'context/auth-context'

import { Order } from './dependencies/order'

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
})

const CenteredBlock = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'calc(100% - 48px)',
        maxWidth: 770,
        marginBottom: 24
    }
})

const Title = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        margin: '32px 0 0 0',

        [theme!.mq.small]: {
            margin: '56px 0 32px 0'
        }
    }
})

function OrdersModule() {
    const client = useClient()
    const ordersQuery = useQuery([queryName.getOrders], () => client.getOrders())

    return (
        <Frame>
            <CenteredBlock>
                <Title>
                    <H1>
                        <FormattedMessage id='app.shipments.myShipments' />
                    </H1>
                </Title>
                {ordersQuery.status === 'loading' && (
                    <Spinner size={37} fill />
                )}
                {ordersQuery.status === 'error' && (
                    <Error fill>
                        <FormattedMessage id='app.getShipmentsError' />
                    </Error>
                )}
                {ordersQuery.status === 'success' && ordersQuery.data.data.length === 0 &&
                    <Error fill>
                        <FormattedMessage
                            id='app.getShipmentsNoItems'
                            values={{
                                br: <br />
                            }}
                        />
                    </Error>
                }
                {ordersQuery.status === 'success' && ordersQuery.data.data.length > 0 && ordersQuery.data.data.map(x => (
                    <Order
                        key={x.trackingNumber}
                        shipment={x}
                    />
                ))}
            </CenteredBlock>
        </Frame>
    )
}

export {
    OrdersModule
}