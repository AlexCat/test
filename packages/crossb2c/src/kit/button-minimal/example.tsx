import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { ButtonMinimal } from './index'

function Example() {

    return (
        <div>
            <ButtonMinimal
            >
                Обычное состояние
            </ButtonMinimal>
            <div style={{ height: 4 }} />
            <ButtonMinimal
                disabled={true}
            >
                disabled
            </ButtonMinimal>
            <div style={{ height: 4 }} />
            <ButtonMinimal
                loading={true}
            >
                loading
            </ButtonMinimal>
        </div>
    )
}

export {
    Example
}