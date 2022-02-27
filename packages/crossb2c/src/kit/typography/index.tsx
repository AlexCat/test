import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

type FontProps = {

}

const H4Frame = styled.h4(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontFamily: 'Sb-Sans-Display',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 15,
        lineHeight: '175%',
        margin: '0 0 12px',
        color: theme?.fns.intentToColor(intent),

        [theme!.mq.small]: {
            fontSize: 20,
            lineHeight: '150%',
            margin: '0 0 24px',
        }
    }
})


const H4 = React.forwardRef<HTMLHeadingElement, PProps>((props: PProps, ref) => {
    const { intent, ...others } = props

    return (
        <H4Frame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

/////////////////////////////////////////////////

const H3Frame = styled.h3(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontFamily: 'Sb-Sans-Display',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 17,
        lineHeight: '150%',
        margin: '0 0 24px',
        color: theme?.fns.intentToColor(intent),

        [theme!.mq.small]: {
            fontSize: 24,
            lineHeight: '120%',
        }
    }
})


const H3 = React.forwardRef<HTMLHeadingElement, PProps>((props: PProps, ref) => {
    const { intent, ...others } = props

    return (
        <H3Frame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

/////////////////////////////////////////////////

const H2Frame = styled.h2(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontFamily: 'Sb-Sans-Display',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 32,
        lineHeight: '120%',
        margin: '0 0 24px',
        color: theme?.fns.intentToColor(intent),
    }
})

const H2 = React.forwardRef<HTMLHeadingElement, PProps>((props: PProps, ref) => {
    const { intent, ...others } = props

    return (
        <H2Frame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

/////////////////////////////////////////////////

const H1Frame = styled.h1(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontFamily: 'Sb-Sans-Display',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 32,
        lineHeight: '120%',

        margin: '0 0 24px',
        color: theme?.fns.intentToColor(intent),

        [theme!.mq.small]: {
            fontSize: 48,
		}
    }
})

const H1 = React.forwardRef<HTMLHeadingElement, PProps>((props: PProps, ref) => {
    const { intent, ...others } = props

    return (
        <H1Frame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

/////////////////////////////////////////////////

type PProps = {
    intent?: Intent
} & JSX.IntrinsicElements['p']

const PFrame = styled.p(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '18px',
        margin: '0 0 4px',
        fontStyle: 'normal',
        color: theme?.fns.intentToColor(intent),
    }
})

const P = React.forwardRef<HTMLParagraphElement, PProps>((props: PProps, ref) => {
    const { intent, ...others } = props

    return (
        <PFrame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

/////////////////////////////////////////////////


type P3Props = {
    intent?: Intent
} & JSX.IntrinsicElements['p']

const P3Frame = styled.p(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        //fontFamily: 'SB Sans Text',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '150%',
        color: theme?.colors.color5,
    }
})

const P3 = React.forwardRef<HTMLParagraphElement, P3Props>((props: P3Props, ref) => {
    const { intent, ...others } = props

    return (
        <P3Frame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

//////////////////////////////////////////////////


type P1Props = {
    intent?: Intent
} & JSX.IntrinsicElements['p']

const P1Frame = styled.p(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '150%',
        color: theme?.colors.color13,

        [theme!.mq.small]: {
            fontSize: '15px',
            lineHeight: '175%',
        }
    }
})

const P1 = React.forwardRef<HTMLParagraphElement, P1Props>((props: P1Props, ref) => {
    const { intent, ...others } = props

    return (
        <P1Frame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})




//////////////////////////////////////////////////
type LinkProps = {
    intent?: Intent
} & JSX.IntrinsicElements['a']

const LinkFrame = styled.a(({ theme, intent }: {
    theme?: Theme,
    intent?: Intent
}) => {
    return {
        fontSize: 13,
        lineHeight: '175%',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: theme?.fns.intentToColor(intent),
        margin: 0
    }
})

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props: LinkProps, ref) => {
    const { intent, ...others } = props

    return (
        <LinkFrame
            ref={ref}
            intent={intent}
            {...others}
        />
    )
})

export {
    H1,
    H2,
    H3,
    H4,
    P,
    P1,
    P3,
    Link
}