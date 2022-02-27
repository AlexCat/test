import { Theme } from '@emotion/react'
import { useTheme } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'

const Frame = styled.div(({ theme, disabled }: {
    theme?: any,
    disabled: boolean
}) => {

    return {
        position: 'relative',
        color: disabled ? theme.colors.color19 : theme.colors.color1
    }
})

const StyledInputWrapper = styled.div(({ theme }: {
    theme?: any
}) => {

    return {
        marginBottom: 4
    }
})

const BottomHint = styled.div(({ theme, computedStyles }: {
    theme?: any
    computedStyles?: any
}) => {

    return {
        position: 'absolute',
        fontWeight: 500,
        fontSize: '14px',
        letterSpacing: '-0.45px',
        marginBottom: 3,

        ...computedStyles
    }
})

type InputGroupProps = {
    intent?: Intent,
    label?: React.ReactChild,
    children: React.ReactChild,
    bottomHint?: React.ReactChild,
    disabled: boolean,
    style?: React.CSSProperties
}

function getIntentProps({ intent, theme }: { intent: Intent, theme: Theme }) {
    return { color: theme.fns.intentToColor(intent) }
}

function InputGroup({
    intent = 'none',
    bottomHint,
    children,
    style,
    disabled = false
}: InputGroupProps) {

    const theme = useTheme()


    return (
        <Frame
            disabled={disabled}
            style={style}
        >
            <StyledInputWrapper>
                {children}
            </StyledInputWrapper>
            <BottomHint computedStyles={getIntentProps({ intent, theme })}>
                {bottomHint}
            </BottomHint>
        </Frame>
    )
}

export {
    InputGroup,
    BottomHint
}