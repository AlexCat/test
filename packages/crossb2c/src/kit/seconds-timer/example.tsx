import { jsx } from '@emotion/react'
import React from 'react'

import { SecondsTimer } from './index'

function Example() {
    const [count, setCount] = React.useState({ count: 10, try: 0 })

    return (
        <div>
            <SecondsTimer
                tryCount={count.try}
                seconds={count.count}
                onStop={() => {
                    console.log('okay')
                }}
            />
            <div>
                <button
                    onClick={e => {
                        setCount(x => ({ count: 5 + x.try, try: x.try + 1 }))
                    }}>
                    еще 15 сек
                </button>
            </div>
        </div>
    )
}

export {
    Example
}