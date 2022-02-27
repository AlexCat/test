import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            color1: string
            color2: string
            color3: string
            color4: string
            color5: string
            color6: string
            color7: string
            color8: string
            color9: string
            color10: string
            color11: string
            color12: string
            color13: string
        },

        spacing: (space: number) => string,

        fns: {
            shadeColor: (color: string, percent: number) => string,
            intentToColor: (intent?: Intent, defaultColor?: string) => string
        },

        mq: {
            small: string,
            medium: string,
            large: string,
        },

    }
}