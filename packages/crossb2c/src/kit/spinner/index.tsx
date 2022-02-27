import { jsx, Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { motion } from 'framer-motion'

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

type SpinnerProps = {
    intent?: Intent
    color?: string
    size?: number
    fill?: boolean,
    duration?: number
    delay?: number
}

function Spinner({
    size = 38,
    intent,
    duration = 0.3,
    delay = 0.3,
    color = '#21a038',
    fill
}: SpinnerProps) {
    const theme = useTheme()

    const Fill = fill ? Frame : React.Fragment

    return (
        <Fill>
            <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration, delay }}

                width={size}
                height={size}
                viewBox={`0 0 38 38`}
                xmlns="http://www.w3.org/2000/svg"
                stroke={`${theme.fns.intentToColor(intent, color || theme.colors.color4)}`}
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite" />
                        </path>
                    </g>
                </g>
            </motion.svg>
        </Fill>
    )
}

export {
    Spinner
}