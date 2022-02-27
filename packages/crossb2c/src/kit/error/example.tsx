import React from 'react'
import { Error } from './index'

function Example() {

    return (
        <React.Fragment>
            <Error>
                Произвольный текст ошибки
            </Error>

            <div style={{ width: 300, height: 200, backgroundColor: 'aliceblue' }}>
                <Error fill>
                    Растянутая по ширине ошибка
                </Error>
            </div>
        </React.Fragment>
    )
}

export {
    Example
}