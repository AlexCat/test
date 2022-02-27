import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { createStyledInputFrame } from '../input'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

type InputMaskProps = MaskedInputProps & { intent?: Intent }

const InputForm = createStyledInputFrame(styled(MaskedInput))

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props: InputMaskProps, ref) => {
    return (
        <InputForm
            ref={ref}
            {...props}
        />
    )
})

const MASK = {
    date: [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    taxNumber: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    phone: ['+', '7', ' ', '(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/],
    phoneCode: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
}

export {
    InputMask,
    MASK
}