import React from 'react'

type FrameProps = {
    children: React.ReactChild,
    title: string,
}

function Frame({
    children,
    title,
}: FrameProps) {
    return (
        <div id={title} style={{
            paddingTop: 20,
            width: '100%',
            maxWidth: 1024,
        }}>
            <a
                style={{
                    padding: '5px 100px 5px 10px',
                    display: 'inline-block',
                    color: 'white',
                    backgroundColor: 'black',
                    marginBottom: 4,
                    textDecoration: 'none',
                    fontSize: 20,
                    fontWeight: 'bolder'
                }}
                href={`#${title}`}
            >
                {title}
            </a>
            {/* <h3>Примеры</h3> */}
            <div style={{ padding: 20, border: '1px solid #ADB2BC' }}>
                {children}
            </div>
        </div>
    )
}

export {
    Frame
}