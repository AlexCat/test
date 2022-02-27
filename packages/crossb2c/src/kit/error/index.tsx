import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Callout } from '../callout'
import { P } from '../typography'

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


type ErrorProps = {
    children?: React.ReactNode
    fill?: boolean
    style?: React.CSSProperties
}

function Error({
    children,
    fill,
    style
}: ErrorProps) {
    const Fill = fill ? Frame : React.Fragment

    return (
        <Fill style={style}>
            <Callout intent='danger' size='small'>
                {children ? children : <FormattedMessage id='app.appError' />}
            </Callout>
        </Fill>
    )
}

export {
    Error,
}