import { useTheme, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { useMedia } from 'context/media-provider'
import { H1 } from 'kit/typography'
import { Button } from 'kit/button'
import { ReactComponent as SuccessIcon } from 'assets/images/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/images/error.svg'
import { AiOutlineWarning } from 'react-icons/ai'

type PaymentStatusCardProps = {
    type: 'success' | 'warning' | 'failure'
    trackingNumber: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    errorText?: string
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
        marginBottom: 64
    }
})

const Message = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 15,
        lineHeight: '175%',
        marginBottom: 40,
        textAlign: 'center'
    }
})

function PaymentStatusCard({
    type,
    errorText,
    trackingNumber,
    onClick
}: PaymentStatusCardProps) {
    const theme = useTheme()
    const { isMobile } = useMedia()

    return (
        <Frame>
            <CenteredBlock>
                {type === 'success' && (
                    <SuccessIcon
                        width={isMobile ? 80 : 120}
                        height={isMobile ? 80 : 120}
                        style={{ marginTop: 40 }}
                    />
                )}

                {type === 'warning' && (
                    <AiOutlineWarning
                        size={isMobile ? 80 : 120}
                        style={{ color: theme.colors.color9, marginTop: 40 }}
                    />
                )}

                {type === 'failure' && (
                    <ErrorIcon
                        width={isMobile ? 80 : 120}
                        height={isMobile ? 80 : 120}
                        style={{ marginTop: 40 }}
                    />
                )}

                <H1 style={{ marginTop: 20, textAlign: 'center', fontSize: isMobile ? 32 : 48 }}>
                    {type === 'success' && <FormattedMessage id='app.payment.successTitle' />}
                    {type === 'warning' && <FormattedMessage id='app.payment.warningTitle' />}
                    {type === 'failure' && <FormattedMessage id='app.payment.failureTitle' />}
                </H1>

                {type === 'success' && (
                    <React.Fragment>
                        <Message>
                            <FormattedMessage id='app.payment.successMessage' values={{ value: trackingNumber }} />
                        </Message>

                        <Button
                            onClick={onClick}
                        >
                            <FormattedMessage id='app.goHome' />
                        </Button>
                    </React.Fragment>
                )}

                {type === 'warning' && (
                    <React.Fragment>
                        <Message>
                            <FormattedMessage id='app.payment.warningMessage' />
                        </Message>

                        <Button
                            onClick={onClick}
                        >
                            <FormattedMessage
                                id='app.retry'
                            />
                        </Button>
                    </React.Fragment>
                )}

                {type === 'failure' && (
                    <React.Fragment>
                        <Message>
                            {errorText || <FormattedMessage id='app.payment.failureMessage' values={{ value: trackingNumber }} />}
                        </Message>

                        <Button
                            onClick={onClick}
                        >
                            <FormattedMessage id='app.retry' />
                        </Button>
                    </React.Fragment>
                )}
            </CenteredBlock>
        </Frame>
    )
}

export {
    PaymentStatusCard
}