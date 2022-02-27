import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Callout } from 'kit/callout'
import { useMedia } from 'context/media-provider'

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function Screen404() {
    const { isMobile } = useMedia()

    return (
        <Frame>
            <Callout intent='danger' size={isMobile ? 'small' : 'big'} style={{ marginTop: 40 }} >
                <FormattedMessage id='app.404' />
            </Callout>
        </Frame>
    )
}

export {
    Screen404
}