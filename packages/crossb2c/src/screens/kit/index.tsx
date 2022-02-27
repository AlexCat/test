import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Frame } from './dependencies/frame'

import { Example as CardExample } from 'kit/card/example'
import { Example as ButtonExample } from 'kit/button/example'
import { Example as SimpleTableExample } from 'kit/simple-table/example'
import { Example as CalloutExample } from 'kit/callout/example'
import { Example as LiveArrowExample } from 'kit/live-arrow/example'
import { Example as CheckboxExample } from 'kit/checkbox/example'
import { Example as InputExample } from 'kit/input/example'
import { Example as InputGroupExample } from 'kit/input-group/example'
import { Example as ErrorExample } from 'kit/error/example'
import { Example as InputMaskExample } from 'kit/input-mask/example'
import { Example as ButtonMinimalExample } from 'kit/button-minimal/example'
import { Example as SecondsTimerExample } from 'kit/seconds-timer/example'

const MainFrame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginBottom: 24
    }
})

export function KitScreen() {

    React.useEffect(() => {
        const controlToScrollTo = document.getElementById(window.location.hash.replace('#', ''))
        controlToScrollTo?.scrollIntoView()
    }, [])

    return (
        <MainFrame>
            <Frame title='SecondsTimer'>
                <SecondsTimerExample />
            </Frame>

            <Frame title='ButtonMinimal'>
                <ButtonMinimalExample />
            </Frame>

            <Frame title='Card'>
                <CardExample />
            </Frame>

            <Frame title='Button'>
                <ButtonExample />
            </Frame>

            <Frame title='SimpleTable'>
                <SimpleTableExample />
            </Frame>

            <Frame title='Callout'>
                <CalloutExample />
            </Frame>

            <Frame title='LiveArrow'>
                <LiveArrowExample />
            </Frame>

            <Frame title='Checkbox'>
                <CheckboxExample />
            </Frame>

            <Frame title='Input'>
                <InputExample />
            </Frame>

            <Frame title='InputGroup'>
                <InputGroupExample />
            </Frame>

            <Frame title='Error'>
                <ErrorExample />
            </Frame>

            <Frame title='InputMask'>
                <InputMaskExample />
            </Frame>
        </MainFrame>
    )
}