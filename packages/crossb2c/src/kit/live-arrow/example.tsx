import { jsx } from '@emotion/react'
import React from 'react'

import { LiveArrow } from './index'

function Example() {
    const [x, setX] = React.useState(0)
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
                style={{ marginRight: 10 }}
                onClick={() => {
                    setX(x => x === 0 ? 180 : 0)
                }}
            >
                Повернуть стрелку
            </button>
            <LiveArrow rotate={x} />
        </div>
    )
}

export {
    Example
}