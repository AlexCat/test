import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { toast } from 'react-toastify'

import { ReactComponent as SuccessIcon } from 'assets/images/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/images/error.svg'

type NotifyType = 'success' | 'error'

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    }
})

const Message = styled.span(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '150%',
        color: theme?.colors.color5
    }
})

function Success({ message }: { message: React.ReactNode }) {
    return (
        <Frame>
            <SuccessIcon
                width={20}
                height={20}
                style={{ margin: '0 16px 0 8px', flexShrink: 0 }}
            />
            <Message>{message}</Message>
        </Frame>
    )
}

function Error({ message }: { message: React.ReactNode }) {
    return (
        <Frame>
            <ErrorIcon
                width={20}
                height={20}
                style={{ margin: '0 16px 0 8px', flexShrink: 0 }}
            />
            <Message>{message}</Message>
        </Frame>
    )
}

export function notify({ type, message }: { type: NotifyType, message: React.ReactNode }) {
    switch (type) {
        case 'success':
            toast.success(<Success message={message} />)
            break;

        case 'error':
            toast.error(<Error message={message} />)
            break;
    }
}