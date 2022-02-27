import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import {
    CustomCheckboxContainer,
    CustomCheckboxInput,
    MixedOrBool
} from "@reach/checkbox"
import { ReactComponent as CheckboxArrowIcon } from 'assets/images/checkbox_arrow.svg'
import { ReactComponent as CheckboxMixedIcon } from 'assets/images/checkbox_mixed.svg'

import "@reach/checkbox/styles.css"
import "kit/checkbox/dependencies/custom-checkbox-styles.css"

type CheckboxProps = {
    name?: string,
    children?: React.ReactChild,
    checked: MixedOrBool,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    style?: React.CSSProperties
}

const StyledLabel = styled.label(({ theme }: { theme: Theme }) => ({
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer'
}))

const Text = styled.span(({ theme }: { theme: Theme }) => ({
    marginLeft: 4
}))

function _getCheckStyle({ checked }: { checked: MixedOrBool }): React.CSSProperties {
    return {
        display: "block",
        position: "absolute",
        width: "60%",
        height: "60%",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scaleX(${!!checked ? 1 : 0}) scaleY(${!!checked ? 1 : 0})`,
        transition: "transform 200ms ease-out, background 200ms ease-out",
        zIndex: 1,
    };
}
function _getMixedStyle({ checked }: { checked: MixedOrBool }): React.CSSProperties {
    return {
        display: "block",
        position: "absolute",
        width: "60%",
        height: "60%",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scaleX(${!!checked ? 1 : 0}) scaleY(${!!checked ? 1 : 0})`,
        transition: "transform 200ms ease-out, background 200ms ease-out",
        zIndex: 1,
    };
}

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
    const {
        onChange,
        checked,
        children,
        name,
        style
    } = props

    return (
        <StyledLabel
            ref={ref}
            className='custom-checkbox'
            style={style}
        >
            <CustomCheckboxContainer
                onChange={onChange}
                checked={checked}
            >
                <CustomCheckboxInput
                    name={name}

                    onChange={onChange}
                    checked={checked === 'mixed' ? undefined : checked}
                />
                {checked !== 'mixed'
                    ? <CheckboxArrowIcon aria-hidden style={_getCheckStyle({ checked })} />
                    : <CheckboxMixedIcon aria-hidden style={_getMixedStyle({ checked })} />
                }
            </CustomCheckboxContainer>
            {children && <Text>{children}</Text>}
        </StyledLabel>
    )
})

function calculateMixed(arr: MixedOrBool[]): MixedOrBool {
    if (arr.every(x => x === true)) {
        return true
    }

    if (arr.every(x => x === false)) {
        return false
    }

    return 'mixed'
}

function useMixedCheckbox({
    watching,
    defaultValue,
}: {
    watching: MixedOrBool[],
    defaultValue: MixedOrBool,
}) {
    const [mixedCheckbox, setMixedCheckbox] = React.useState<MixedOrBool>(defaultValue)


    React.useEffect(() => {
        setMixedCheckbox(calculateMixed(watching))
    }, [watching])


    return {
        updateMixedState: () => {
            const newState = mixedCheckbox === 'mixed' ? true : !mixedCheckbox
            setMixedCheckbox(newState)

            return newState
        },
        mixedCheckbox
    }

}

export {
    Checkbox,
    calculateMixed,
    useMixedCheckbox
}