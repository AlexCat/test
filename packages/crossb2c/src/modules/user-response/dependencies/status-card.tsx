import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { useMedia } from 'context/media-provider'
import { H1 } from 'kit/typography'
import { Button } from 'kit/button'
import { ReactComponent as SuccessIcon } from 'assets/images/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/images/error.svg'

type StatusCardProps = {
    type: 'success' | 'error'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    title?: string
    text?: string
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
        maxWidth: 770
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

function StatusCard({
    type,
    title,
    text,
    onClick
}: StatusCardProps) {
    const { isMobile } = useMedia()

    return (
        <Frame>
            <CenteredBlock>
                {type === 'success' && (
                    <SuccessIcon
                        width={isMobile ? 80 : 120}
                        height={isMobile ? 80 : 120}
                    />
                )}

                {type === 'error' && (
                    <ErrorIcon
                        width={isMobile ? 80 : 120}
                        height={isMobile ? 80 : 120}
                    />
                )}

                <H1 style={{ marginTop: 20, textAlign: 'center', fontSize: isMobile ? 32 : 48 }}>
                    {type === 'success' && (title || <FormattedMessage id='app.userResponse.successTitle' />)}
                    {type === 'error' && (title || <FormattedMessage id='app.userResponse.errorTitle' />)}
                </H1>

                {type === 'success' && (
                    <React.Fragment>
                        <Message>
                            {text || <FormattedMessage id='app.userResponse.successMessage' />}
                        </Message>
                    </React.Fragment>
                )}

                {type === 'error' && (
                    <React.Fragment>
                        <Message>
                            {text || <FormattedMessage id='app.userResponse.errorMessage' />}
                        </Message>

                        <Button
                            onClick={onClick}
                        >
                            <FormattedMessage id='app.userResponse.retry' />
                        </Button>
                    </React.Fragment>
                )}
            </CenteredBlock>
        </Frame>
    )
}

export {
    StatusCard
}