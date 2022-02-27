import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, ReactElement } from 'react'

import { motion } from 'framer-motion'

type SvgRotatorProps = {
    iconHeight: number,
    iconWidth: number,
    rotate: number,
    style?: React.CSSProperties
}

const SvgRotator: FC<SvgRotatorProps> = ({
    iconHeight,
    iconWidth,
    rotate,
    children,
    style
}): ReactElement => {
    return (
        <motion.svg
            style={style}
            height={iconHeight}
            width={iconWidth}
            animate={{ rotate }}
        >
            {children}
        </motion.svg>
    )
}

export {
    SvgRotator
}