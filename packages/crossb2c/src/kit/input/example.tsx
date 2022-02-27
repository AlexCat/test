import { jsx } from '@emotion/react'
import React from 'react'

import { Input } from './index'

function Example() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div>
            <Input value='Мирослав'/>
            <Input intent='danger' />
        </div>
    )
}

export {
    Example
}