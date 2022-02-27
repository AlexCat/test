export const small = '@media (min-width: 768px)'
export const medium = '@media (min-width: 1280px)'
export const large = '@media (min-width: 1440px)'

export const theme = {
    mq: {
        small,
        medium,
        large,
    }
}

const appTheme = {
    colors: {
        color1: '#828282',
        color2: '#eef1f3',
        color3: '#21a038',
        color4: '#fff',
        color5: '#080808',
        color6: '#dc3545',
        color7: '#007bff',
        color8: '#F8F8FC',
        color9: '#E6AE20',
        color10: '#F4FaF5',
        color11: '#f1f3f6',
        color12: '#DADEE0',
        color13: '#979797'
    },
    spacing: (space: number) => `${space}px`,
    fns: {
        shadeColor(color: string, percent: number) {
            return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + percent)).toString(16)).substr(-2))
        },
        intentToColor(intent?: Intent, defaultColor?: string): string {
            switch (intent) {
                case undefined: return defaultColor || 'inherit'
                case 'none': return defaultColor || 'inherit'
                case 'danger': return appTheme.colors.color6
                case 'primary': return appTheme.colors.color7
                case 'success': return appTheme.colors.color3
                default: return appTheme.colors.color5
            }
        }
    },
    mq: {
        small,
        medium,
        large,
    }
}

export {
    appTheme
}