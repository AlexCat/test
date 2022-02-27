import { jsx } from '@emotion/react'
import React from 'react'

import { InputGroup } from './index'
import { Input } from '../input'

const Box = ({ children }: { children?: React.ReactChild }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginLeft: 10,
        }}
    >
        {children}
    </div>
)

const Divider = ({ children }: { children?: React.ReactChild }) => (
    <div
        style={{
            marginLeft: 10,
        }}
    >{children}
    </div>
)

function Example() {

    const hasError = true
    const [value, setValue] = React.useState('example1')

    return (
        <React.Fragment>
            <Box>
                <InputGroup
                    intent={hasError ? 'danger' : 'none'}
                    disabled={hasError}
                    bottomHint="adasdasd"
                >
                    <Input
                        placeholder='disabled'
                        intent={hasError ? 'danger' : 'none'}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                </InputGroup>

            </Box>
        </React.Fragment >
    )
}

export {
    Example
}