import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Spinner } from 'kit/spinner'

type ButtonMinimalProps = {
    intent?: Intent
    loading?: boolean
    size?: sizeProps
    icon?: React.ReactNode
} & JSX.IntrinsicElements['button']

type sizeProps = 'small' | 'medium' | 'large'

const ButtonFrame = styled.button(({ theme, loadingState, size }: {
    theme?: Theme,
    loadingState?: boolean
    size: sizeProps
}) => {

    return {
        fontFamily: "Sb-Sans-Text",
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        lineHeight: '175%',
        border: 0,

        backgroundColor: 'transparent',
        color: theme!.colors.color3,
        cursor: loadingState ? 'default' : 'pointer',
        padding: size === 'small' ? '3px 8px' : '7px 21px',

        borderRadius: 50,
        transition: '.2s all',

        ':disabled': {
            cursor: 'not-allowed',
        },

        ':hover': {
            backgroundColor: theme!.colors.color11//theme!.fns.shadeColor(theme!.colors.color3, 100),
        },

        ':active': {
            backgroundColor: `${theme!.fns.shadeColor(theme!.colors.color11, -10)}`,
        },
    }
})


const ButtonMinimal = React.forwardRef<HTMLButtonElement, ButtonMinimalProps>((props: ButtonMinimalProps, ref) => {
    const {
        icon,
        loading,
        disabled,
        children,
        size = 'medium',
        ...others
    } = props

    return (
        <ButtonFrame
            ref={ref}
            {...others}
            disabled={loading || disabled}
            loadingState={loading}
            type='button'
            size={size}
        >
            {icon && icon}
            {loading ? <Spinner color='black' size={15} /> : children}
        </ButtonFrame>
    )
})

export {
    ButtonMinimal
}