import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Spinner } from 'kit/spinner'

function getPaddings(size: sizeProps) {
    switch (size) {
        case 'small':
            return '7px 21px'
        case 'medium':
            return '11px 33px'
        case 'large':
            return '17px 51px'
        default:
            return 7
    }
}

function makePalette(theme: Theme, intent?: Intent) {
    switch (intent) {
        case 'primary':
            return { backgroundColor: theme.colors.color3, disabledBackground: theme.colors.color13, color: theme?.colors.color4 }
        case 'warning':
            return { backgroundColor: theme.colors.color9, disabledBackground: theme.colors.color13, color: theme?.colors.color4 }
        case 'none':
        default:
            return { backgroundColor: theme.colors.color11, disabledBackground: theme.colors.color13, color: theme?.colors.color5 }
    }
}

type ButtonProps = {
    intent?: Intent
    loading?: boolean
    size?: sizeProps
} & JSX.IntrinsicElements['button']

type sizeProps = 'small' | 'medium' | 'large'

const ButtonFrame = styled.button(({ theme, loadingState, size, intent }: {
    theme?: Theme,
    loadingState?: boolean
    size: sizeProps
    intent?: Intent
}) => {

    const palette = makePalette(theme!, intent)

    return {
        fontFamily: "Sb-Sans-Text",
        display: 'flex',
        justifyContent: 'center',
        padding: getPaddings(size),
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '175%',
        borderRadius: 50,
        border: 0,
        color: palette.color,
        backgroundColor: palette.backgroundColor,
        cursor: loadingState ? 'default' : 'pointer',
        minWidth: 150,
        transition: '.2s all',

        ':disabled': {
            cursor: 'not-allowed',
            backgroundColor: palette.disabledBackground,

            ':hover': {
                background: palette.disabledBackground
            },
        },
        ':hover': {
            background: `${theme?.fns.shadeColor(palette.backgroundColor, -5)}`,
        },
        ':active': {
            background: `${theme?.fns.shadeColor(palette.backgroundColor, -20)}`,
        },
    }
})


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
    const {
        size = 'medium',
        intent = 'primary',
        loading,
        disabled,
        children,

        ...others
    } = props

    return (
        <ButtonFrame
            ref={ref}
            {...others}
            disabled={loading || disabled}
            loadingState={loading}
            size={size}
            intent={intent}
        >
            {loading ? <Spinner delay={0} color='white' size={26} /> : children}
        </ButtonFrame>
    )
})

export {
    Button
}