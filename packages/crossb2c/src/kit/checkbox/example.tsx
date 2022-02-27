import { jsx } from '@emotion/react'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import {
    MixedOrBool
} from "@reach/checkbox"

import { Checkbox, calculateMixed, useMixedCheckbox } from './index'

type FormInputs = {
    checkbox1Value: MixedOrBool
    checkbox2Value: MixedOrBool
}

function Example() {
    const externalValues = {
        checkbox1Value: true,
        checkbox2Value: false,
    }

    const [second, setSecond] = React.useState<MixedOrBool>(true)


    const mixedValue = calculateMixed([externalValues.checkbox1Value, externalValues.checkbox2Value])

    const formProps = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            checkbox1Value: externalValues.checkbox1Value,
            checkbox2Value: externalValues.checkbox2Value,
        }
    })

    const { updateMixedState, mixedCheckbox } = useMixedCheckbox({
        watching: formProps.watch(['checkbox1Value', 'checkbox2Value']),
        defaultValue: mixedValue,
    })

    return (
        <React.Fragment>
            <h4>Variant 1</h4>
            <form>
                <Checkbox
                    checked={mixedCheckbox}
                    onChange={e => {
                        const nextValue = updateMixedState()

                        formProps.setValue('checkbox1Value', nextValue, { shouldDirty: true, shouldValidate: true })
                        formProps.setValue('checkbox2Value', nextValue, { shouldDirty: true, shouldValidate: true })
                    }}
                >
                    {`mixed ${mixedCheckbox.toString()}`}
                </Checkbox>
                <div />
                <Controller
                    name="checkbox1Value"
                    control={formProps.control}
                    render={({ field }) => {
                        return (
                            <Checkbox
                                ref={field.ref}
                                checked={field.value}
                                onChange={e => {
                                    formProps.setValue('checkbox1Value', !field.value, { shouldDirty: true, shouldValidate: true })
                                }}
                            >
                                {`checkbox1Value (${field.value})`}
                            </Checkbox>
                        )
                    }}
                />

                <div />
                <Controller
                    name="checkbox2Value"
                    control={formProps.control}
                    render={({ field }) => {
                        return (
                            <Checkbox
                                ref={field.ref}
                                checked={field.value}
                                onChange={e => {
                                    formProps.setValue('checkbox2Value', !field.value, { shouldDirty: true, shouldValidate: true })
                                }}
                            >
                                {`checkbox2Value (${field.value})`}
                            </Checkbox>
                        )
                    }}
                />
            </form>
        </React.Fragment >
    )
}

export {
    Example
}