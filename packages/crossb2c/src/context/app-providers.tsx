import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@emotion/react'
import { QueryParamProvider } from 'use-query-params'
import { IntlProvider } from 'react-intl'

import { MediaProvider } from 'context/media-provider'
import { AuthProvider } from 'context/auth-context'
import { RouteAdapter } from 'utils/route-adapter'
import { appTheme } from 'theme'
import { queryClient } from 'utils/react-query-config'
import { GlobalStyles } from 'theme/global-styles'
import ru from 'localization/languages/ru.json'

//----------------------------------

function AppProviders({ children }: { children: React.ReactChild }) {
    return (
        <MediaProvider>
            <ThemeProvider theme={appTheme}>
                <GlobalStyles />
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <QueryParamProvider ReactRouterRoute={RouteAdapter as any}>
                            <AuthProvider>
                                <IntlProvider
                                    messages={ru}
                                    locale={'ru-RU'}
                                    key={'ru-RU'} // https://formatjs.io/docs/react-intl/components#dynamic-language-selection
                                >
                                    {children}
                                </IntlProvider >
                            </AuthProvider>
                        </QueryParamProvider>
                    </Router>
                </QueryClientProvider>
            </ThemeProvider>
        </MediaProvider>
    )
}

export {
    AppProviders
}