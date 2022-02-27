import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import React from 'react'

const FancyLink = styled(Link)(({ theme }: {
    theme?: Theme
}) => {
    return {
        marginBottom: 14,
        display: 'inline-flex',
        alignItems: 'center',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: 13,
        lineHeight: '175%',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: theme?.colors.color3,
        ':hover': {
            textDecoration: 'underline'
        }
    }
})

// const FancyLink = React.forwardRef<HTMLAnchorElement, FancyLinkProps>((props: FancyLinkProps, ref) => {
//     const {
//         navigate,
//         children,
//         ...others
//     } = props

//     return (
//         <Frame ref={ref} {...others}>💅 {children}</Frame>
//     )
// })

export {
    FancyLink
}