import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

type CardProps = {
    style?: React.CSSProperties
    ref?: React.RefObject<HTMLDivElement>
    children?: React.ReactNode
}

const CardFrame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        background: theme?.colors.color4,
        border: '0.5px solid rgba(8, 8, 8, 0.1)',
        borderRadius: 16,
        boxShadow: '0px 3px 13px rgba(0, 0, 0, 0.1)',
        label: 'Card'
    }
})

function Card({
    ref,
    style,
    children
}: CardProps) {

    return (
        <CardFrame
            ref={ref}
            style={style}
        >
            {children}
        </CardFrame>
    )
}

const CardContentFrame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 16,
        padding: 16,
        label: 'CardContent',

        [theme!.mq.small]: {
            padding: 24,
        }
    }
})

function CardContent({
    ref,
    style,
    children
}: CardProps) {

    return (
        <CardContentFrame
            ref={ref}
            style={style}
        >
            {children}
        </CardContentFrame>
    )
}

export {
    Card,
    CardContent
}