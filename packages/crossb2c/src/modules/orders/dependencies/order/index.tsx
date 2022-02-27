import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import AnimateHeight from 'react-animate-height'
import { useNavigate } from 'react-router-dom'

import { routesList } from 'routes/routes-list'
import { Card, CardContent } from 'kit/card'
import { Button } from 'kit/button'
import { Link, H3 } from 'kit/typography'
import { LiveArrow } from 'kit/live-arrow'
import { Callout } from 'kit/callout'
import { useMedia } from 'context/media-provider'
import { Shipment } from 'api/typings/get-shipments'

import { Goods } from './dependencies/goods'

const OrderTitle = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 15,
        lineHeight: '135%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        [theme!.mq.small]: {
            fontSize: 24,
            lineHeight: '120%',
        }
    }
})

const InfoBlock = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 12,
        lineHeight: '150%',
        display: 'flex',
        flexDirection: 'column',

        [theme!.mq.small]: {
            fontSize: 13,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    }
})

const InfoTitle = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {
        opacity: 0.5
    }
})

const ButtonsBlock = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: "inline-flex",
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 24,
    }
})

function getCalloutText({
    isCustomsDutyRequired,
    isPersonalDataRequired,
    isAdditionalDocumentsRequired
}: {
    isCustomsDutyRequired: boolean,
    isPersonalDataRequired: boolean,
    isAdditionalDocumentsRequired: boolean
}) {
    if (isCustomsDutyRequired && isPersonalDataRequired && isAdditionalDocumentsRequired) {
        return <FormattedMessage id='app.shipments.payAndFillAndUploadCallout' />
    }

    if (isCustomsDutyRequired && isPersonalDataRequired) {
        return <FormattedMessage id='app.shipments.payAndFillCallout' />
    }
    if (isCustomsDutyRequired && isAdditionalDocumentsRequired) {
        return <FormattedMessage id='app.shipments.payAndUploadCallout' />
    }
    if (isAdditionalDocumentsRequired && isPersonalDataRequired) {
        return <FormattedMessage id='app.shipments.fillAndUploadCallout' />
    }

    else if (isCustomsDutyRequired) {
        return <FormattedMessage id='app.shipments.payFeeCallout' />
    }
    else if (isPersonalDataRequired) {
        return <FormattedMessage id='app.shipments.fillDataCallout' />
    }
    else if (isAdditionalDocumentsRequired) {
        return <FormattedMessage id='app.shipments.uploadDocsCallout' />
    }

    return ""
}

function Order({ shipment }: {
    shipment: Shipment
}) {
    const { isMobile } = useMedia()
    const { colors } = useTheme()
    const navigate = useNavigate()

    const [height, setHeight] = React.useState<'auto' | 0>(0)

    const needActions = shipment.isCustomsDutyRequired || shipment.isPersonalDataRequired || shipment.isAdditionalDocumentsRequired

    return (
        <Card style={{ width: 'calc(100% - 1px)', marginBottom: 24 }}>
            <CardContent>
                <div style={{ cursor: 'pointer' }} onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
                    <OrderTitle>
                        <H3 style={{ display: 'flex', margin: 0, marginRight: 8 }}>
                            <FormattedMessage id='app.shipments.parcelFrom' /> {shipment.senderName}
                        </H3>
                        <LiveArrow style={{ flexShrink: 0 }} rotate={height === 'auto' ? 180 : 0} />
                    </OrderTitle>
                </div>

                <InfoBlock>
                    <div>
                        <InfoTitle><FormattedMessage id='app.shipments.trackNumber' />: </InfoTitle>
                        <Link
                            target='_blank'
                            href={`https://sberlogistics.ru/tracking?number=${shipment.trackingNumber}`}
                            intent='success'
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            {shipment.trackingNumber}
                        </Link>
                    </div>
                    <InfoTitle>от {format(parseISO(shipment.orderDate), 'd MMMM yyyy', { locale: ru })} г.</InfoTitle>
                </InfoBlock>

                {needActions &&
                    <Callout intent='danger' size='small' backgroundColor={colors.color10} style={{ marginTop: 24 }}>
                        {
                            getCalloutText({
                                isCustomsDutyRequired: shipment.isCustomsDutyRequired,
                                isPersonalDataRequired: shipment.isPersonalDataRequired,
                                isAdditionalDocumentsRequired: shipment.isAdditionalDocumentsRequired
                            })
                        }
                    </Callout>
                }

                {needActions &&
                    <ButtonsBlock>
                        {shipment.isCustomsDutyRequired &&
                            <Button
                                onClick={e => {
                                    navigate(routesList.fns.createPaymentInfo(shipment.trackingNumber))
                                }}
                                style={{
                                    display: 'flex',
                                    flexGrow: 1
                                }}
                            >
                                <FormattedMessage id='app.shipments.payFee' />
                            </Button>
                        }
                        {shipment.isPersonalDataRequired &&
                            <Button
                                onClick={e => {
                                    navigate(routesList.profile)
                                }}
                                style={{
                                    display: 'flex',
                                    flexGrow: 1
                                }}
                                intent="warning"
                            >
                                <FormattedMessage id='app.shipments.fillData' />
                            </Button>
                        }
                        {shipment.isAdditionalDocumentsRequired &&
                            <Button
                                onClick={e => {
                                    navigate(routesList.fns.createCustomsDocs(shipment.trackingNumber))
                                }}
                                style={{
                                    display: 'flex',
                                    flexGrow: 1
                                }}
                                intent="warning"
                            >
                                <FormattedMessage id='app.shipments.uploadDocs' />
                            </Button>
                        }
                    </ButtonsBlock>
                }

                <AnimateHeight
                    duration={500}
                    height={height} // see props documentation below
                >
                    <Goods goods={shipment.orderList} />
                </AnimateHeight>

                {/* 
                        <InfoTitle>Адрес доставки:</InfoTitle>
                        <PickupPointBlock>
                            <MapIcon width={18} height={18} />
                            <span style={{ marginLeft: 11 }}>Выбрать пункт выдачи СберЛогистика</span>
                        </PickupPointBlock>
                         */}
            </CardContent>
        </Card >
    )
}

export {
    Order
}