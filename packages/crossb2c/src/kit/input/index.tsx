import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

type InputProps = {
    intent?: Intent,
} & JSX.IntrinsicElements['input']

function createStyledInputFrame(element: any) {
    return element(({ theme, intent }: {
        theme?: Theme,
        intent?: Intent
    }) => {
        const {
            fns: { intentToColor, shadeColor },
            colors
        } = theme!
        return {
            padding: '14px 20px',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '15px',
            outline: 0,
            color: colors.color5,
            border: intent ? `1px solid ${intentToColor(intent, colors.color2)}` : `1px solid ${colors.color2}`,
            background: colors.color2,
            borderRadius: '8px',
            boxSizing: 'border-box',
            lineHeight: '135%',
            transition: '.2s all',

            // start - убираем стрелочки для инпута с type = number
            '::-webkit-outer-spin-button': {
                'WebkitAppearance': 'none',
                margin: '0'
            },

            '::-webkit-inner-spin-button': {
                'WebkitAppearance': 'none',
                margin: '0'
            },

            'input[type=number]': {
                'MozAppearance': 'textfield'
            },
            // end - убираем стрелочки для инпута с type = number

            ':disabled': {
                cursor: 'not-allowed',
                backgroundColor: shadeColor(colors.color2, 10),
                border:shadeColor(colors.color2, 10),
    
                ':hover': {
                    background: shadeColor(colors.color2, 10),
                    border:shadeColor(colors.color2, 10),
                },
            },

            ':hover': {
                borderColor: shadeColor(intentToColor(intent, colors.color1), 70), // intentToColor(intent, colors.color2)
            },

            ':focus': {
                borderColor: shadeColor(intentToColor(intent, colors.color1), 10), // intentToColor(intent, colors.color2)
            }
        }
    })
}

const InputFrame = createStyledInputFrame(styled.input)

const Input = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    const { intent, ...others } = props

    return (
        <InputFrame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

export {
    Input,
    createStyledInputFrame
}

export type {
    InputProps
}