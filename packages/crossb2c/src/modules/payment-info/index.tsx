import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { default as NumberFormat } from 'react-number-format'
import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { useClient } from 'context/auth-context'
import { routesList } from 'routes/routes-list'
import { Card, CardContent } from 'kit/card'
import { FancyLink } from 'kit/fancy-link'
import { Button } from 'kit/button'
import { H1, H3 } from 'kit/typography'
import { notify } from 'kit/notify'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/arrow_left.svg'
import { GetPaymentInfo_ServerResponse } from 'api/typings/get-payment-info'
import { GetPaymentUrl_ServerRequest, GetPaymentUrl_ServerResponse } from 'api/typings/get-payment-url'

type PaymentInfoProps = {
    model: GetPaymentInfo_ServerResponse
    trackingNumber: string
}

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
    }
})

const CostBlock = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12
    }
})

const CostLine = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 15,
        lineHeight: '175%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8
    }
})

const CostTitle = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {

    }
})

const CostValue = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontWeight: 600
    }
})

const FinalCostBlock = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12,
        borderTop: '0.5px solid rgba(8, 8, 8, 0.1)', paddingTop: 16
    }
})

const FinalCostTitle = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {

        fontWeight: 600
    }
})

const FinalCostValue = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 24,
        lineHeight: '120%'
    }
})

const Title = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        width: '100%',
        margin: '32px 0 0 0',
        textAlign: 'center',

        [theme!.mq.small]: {
            margin: '40px 0 0 0',
            '> a': {
                width: '100%',
                marginBottom: 0,
            },
        }
    }
})

const OrderNumber = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 13,
        lineHeight: '150%',
        opacity: 0.5,
        marginBottom: 8
    }
})

const Mapper = {
    centToCurrency(value: number | undefined | null) {
        return value
            ? <NumberFormat
                displayType={'text'}
                decimalSeparator=','
                thousandSeparator=' '
                value={value / 100}
            />
            : '—'
    },
    toCurrencySign(value: string) {
        return value === 'RUB' ? '₽' : value
    }
}

function PaymentInfo({
    model,
    trackingNumber
}: PaymentInfoProps) {
    const { formatMessage } = useIntl()
    const client = useClient()
    const baseUrl = window.location.origin
    const getPaymentUrlData: GetPaymentUrl_ServerRequest = {
        trackingNumber: trackingNumber,
        returnUrl: `${baseUrl}${routesList.fns.createPaymentSuccess(trackingNumber)}`,
        failUrl: `${baseUrl}${routesList.fns.createPaymentFailure(trackingNumber)}`,
    }

    const getUrlMutationProps = useMutation((data: GetPaymentUrl_ServerRequest) => {
        return client.getPaymentUrl(data)
    }, {
        onSuccess: ({ data: { formUrl } }: AxiosResponse<GetPaymentUrl_ServerResponse>) => {
            window.open(formUrl, "_self")
        },
        onError: (e: HttpErrorResponse<keyof GetPaymentUrl_ServerRequest>) => {
            try {
                if (e.response?.data?.title) {
                    notify({
                        message: e.response?.data?.title,
                        type: 'error'
                    })
                }
                else {
                    notify({
                        message: formatMessage({ id: 'app.paymentInfo.cantCreatePaymentUrl' }),
                        type: 'error'
                    })
                }
            } catch (ex) {
                notify({
                    message: formatMessage({ id: 'app.paymentInfo.cantCreatePaymentUrl' }),
                    type: 'error'
                })
            }
        }
    })

    return (
        <Frame>
            <CenteredBlock>
                <Title>
                    <FancyLink
                        to={routesList.orders}
                    >
                        <ArrowLeftIcon style={{ marginRight: 4 }} /> <FormattedMessage id='app.goBack' />
                    </FancyLink>
                    <H1
                        style={{
                            textAlign: 'center'
                        }}>
                        <FormattedMessage id='app.paymentInfo.title' />
                    </H1>
                </Title>
                <Card style={{ marginBottom: 48, width: 'calc(100% - 1px)', maxWidth: 368 }}>
                    <CardContent>
                        <OrderNumber><FormattedMessage id='app.paymentInfo.orderNumber' />:</OrderNumber>
                        <H3>{trackingNumber}</H3>
                        <CostBlock>
                            <CostLine>
                                <CostTitle><FormattedMessage id='app.paymentInfo.customsTax' /></CostTitle>
                                <CostValue>{Mapper.centToCurrency(model.customsTax)} {Mapper.toCurrencySign(model.currency)}</CostValue>
                            </CostLine>
                            <CostLine>
                                <CostTitle><FormattedMessage id='app.paymentInfo.customsFixFee' /></CostTitle>
                                <CostValue>{Mapper.centToCurrency(model.customsFixFee)} {Mapper.toCurrencySign(model.currency)}</CostValue>
                            </CostLine>
                            <CostLine>
                                <CostTitle><FormattedMessage id='app.paymentInfo.serviceFee' /></CostTitle>
                                <CostValue>{Mapper.centToCurrency(model.serviceFeeWithoutVat + model.vatPrice)} {Mapper.toCurrencySign(model.currency)}</CostValue>
                            </CostLine>
                        </CostBlock>

                        <FinalCostBlock>
                            <CostLine >
                                <FinalCostTitle><FormattedMessage id='app.paymentInfo.total' />:</FinalCostTitle>
                                <FinalCostValue>{Mapper.centToCurrency(
                                    model.customsTax + model.customsFixFee + model.serviceFeeWithoutVat + model.vatPrice
                                )} {Mapper.toCurrencySign(model.currency)}</FinalCostValue>
                            </CostLine>
                        </FinalCostBlock>

                        <Button
                            onClick={() => getUrlMutationProps.mutateAsync(getPaymentUrlData)}
                            disabled={getUrlMutationProps.isLoading}
                        >
                            <FormattedMessage id='app.paymentInfo.pay' />
                        </Button>

                    </CardContent>
                </Card>
            </CenteredBlock>
        </Frame>
    )
}

export {
    PaymentInfo
}