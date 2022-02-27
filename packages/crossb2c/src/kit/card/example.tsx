import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Card } from './index'

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {

    }
})

function Example() {

    return (
        <Card>
            <div>
                card example
            </div>
        </Card>
    )
}

export {
    Example
}