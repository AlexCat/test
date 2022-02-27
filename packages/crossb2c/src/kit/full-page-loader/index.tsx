
import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Spinner } from 'kit/spinner'

type FullPageLoaderProps = {

}

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function FullPageLoader({

}: FullPageLoaderProps) {

    return (
        <Frame>
            <Spinner
                size={60}
            />
        </Frame>
    )
}

export {
    FullPageLoader
}