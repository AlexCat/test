import { SvgRotator } from 'kit/animations/svg-rotator'
import React from 'react'

function LiveArrow({
    rotate,
    color = '#444950',
    style
}: {
    rotate: number,
    color?: string,
    style?: React.CSSProperties
}) {
    return (
        <SvgRotator
            rotate={rotate}
            iconHeight={20}
            iconWidth={20}
            style={style}
        >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.264835 0.39725C0.593243 0.113389 1.09907 0.138957 1.39464 0.454359L8.00001 7.50298L14.6054 0.454359C14.9009 0.138957 15.4068 0.113389 15.7352 0.39725C16.0636 0.681111 16.0902 1.16691 15.7946 1.48231L8.00001 9.80001L0.205372 1.48231C-0.0901956 1.16691 -0.063573 0.681111 0.264835 0.39725Z" fill="#21A038" />
            </svg>
        </SvgRotator>
    )
}

export {
    LiveArrow
}




