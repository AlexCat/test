import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { ReactComponent as ExclamationIcon } from 'assets/images/exclamation.svg'
import { AiOutlineWarning } from 'react-icons/ai'

import { H4, P3 } from 'kit/typography'

type CalloutProps = {
    intent?: Intent,
    children?: React.ReactNode,
    style?: React.CSSProperties,
    backgroundColor?: string
    size?: 'small' | 'big'
}

const Frame = styled.div(({ theme, isSmall, backgroundColor }: {
    theme?: Theme,
    intent?: Intent,
    backgroundColor: string,
    isSmall: boolean
}) => {
    return {
        display: 'flex',
        padding: isSmall ? 8 : 24,
        borderRadius: isSmall ? 4 : 16,
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        backgroundColor,
    }
})

const Sign = styled.div(({ theme, isSmall }: {
    theme?: Theme,
    isSmall: boolean
}) => {
    return {
        marginTop: isSmall ? 0 : 3,
        marginRight: 8,
    }
})

function ChooseSign({ intent, style }: { intent?: Intent, style?: React.CSSProperties }) {
    switch (intent) {
        case 'danger': return <ExclamationIcon style={style} />
        case 'warning': return <AiOutlineWarning style={style} />
        default: return <React.Fragment />
    }
}

function chooseColor(intent?: Intent): string {
    switch (intent) {
        case 'danger': return 'rgba(247, 20, 47, 0.05)'
        case 'warning': return '#e6ae200d'
        default: return 'inherit'
    }
}

function Callout({
    children,
    intent,
    style,
    backgroundColor,
    size = 'big',
}: CalloutProps) {
    const isSmall = size === 'small'

    return (
        <Frame
            intent={intent}
            backgroundColor={backgroundColor || chooseColor(intent)}
            style={style}
            isSmall={isSmall}
        >
            <Sign isSmall={isSmall}>
                <ChooseSign intent={intent} style={{ width: isSmall ? 16 : 24, height: isSmall ? 16 : 24 }} />
            </Sign>
            {isSmall ? (
                <P3 style={{ display: 'flex', alignItems: 'center' }}>
                    {children}
                </P3>
            ) : (
                <H4 style={{ margin: 0 }}>
                    {children}
                </H4>
            )}
        </Frame>
    )
}

export {
    Callout
}