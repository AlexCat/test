import { jsx, Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Callout } from './index'

function Example() {
    const { colors } = useTheme()

    return (
        <React.Fragment>
            <div style={{ maxWidth: 772, marginBottom: 8 }}>
                <Callout intent='danger' size='big'>
                    Заполните персональные данные, чтобы посылки не остались на границе России
                </Callout>
            </div>
            <div style={{ maxWidth: 240 }}>
                <Callout intent='danger' size='small' backgroundColor={colors.color10}>
                    Заполните персональные данные, чтобы посылки не остались на границе России
                </Callout>
            </div>
        </React.Fragment>
    )
}

export {
    Example
}