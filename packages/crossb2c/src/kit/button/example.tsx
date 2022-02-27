import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Button } from './index'

function Example() {

    return (
        <div>
            <Button
            >
                Обычное состояние
            </Button>
            <div style={{ height: 4 }} />
            <Button
                disabled={true}
            >
                disabled
            </Button>
            <div style={{ height: 4 }} />
            <Button
                loading={true}
            >
                loading
            </Button>
        </div>
    )
}

export {
    Example
}