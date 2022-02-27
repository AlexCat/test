import React from 'react'

import { useInterval, useBoolean } from 'react-use'

function useCountdown({
    seconds,
    tryCount,
    onStop
}: {
    seconds: number
    tryCount: number
    onStop?: () => void
}) {

    const [count, setCount] = React.useState(seconds)
    const [isRunning, toggleIsRunning] = useBoolean(false)

    useInterval(
        () => {
            setCount(count - 1)
        },
        isRunning ? 1000 : null
    );

    React.useEffect(() => {
        if (count === 0) {
            toggleIsRunning()
            onStop?.()
        }
    }, [count])

    React.useEffect(() => {
        setCount(seconds)
        toggleIsRunning()
    }, [tryCount])

    return count
}

export {
    useCountdown
}