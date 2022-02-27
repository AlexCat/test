import { jsx } from '@emotion/react'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { routesList } from './routes-list'
import { OrdersScreen } from 'screens/orders'
import { RequireAuth, OnlyAnonymous } from 'routes/require-auth'
import { isLocalhost } from 'utils'
import { AppLayout } from 'kit/layouts'
import { LoginScreen } from 'screens/login'
import { LoginByPhoneScreen } from 'screens/login-by-phone'
import { KitScreen } from 'screens/kit'
import { Screen404 } from 'screens/404'
import { AuthOidcScreen } from 'screens/auth-oidc'
import { PaymentInfoScreen } from 'screens/payment-info'
import { SuccessScreen } from 'screens/payment/success'
import { FailureScreen } from 'screens/payment/failure'
import { SendUserInfoScreen } from 'screens/send-user-info'
import { UserResponseScreen } from 'screens/user-response'
import { CustomsDocsScreen } from 'screens/customs-docs'
import { WidgetDemoScreen } from 'screens/widget-demo'
import { ProfileScreen } from 'screens/profile'

// https://github.com/remix-run/react-router/blob/main/docs/guides/migrating-5-to-6.md

// https://github.com/remix-run/react-router/tree/dev/examples/auth - пример авторизации

export function AppRoutes() {

    return (
        <Routes>
            <Route
                path={routesList.login}
                element={(
                    <OnlyAnonymous>
                        <AppLayout>
                            <LoginScreen />
                        </AppLayout>
                    </OnlyAnonymous>
                )}
            />

            <Route
                path={routesList.loginByPhone}
                element={(
                    <OnlyAnonymous>
                        <AppLayout>
                            <LoginByPhoneScreen />
                        </AppLayout>
                    </OnlyAnonymous>
                )}
            />

            <Route
                path={routesList.authOidc}
                element={(
                    <OnlyAnonymous>
                        <AppLayout>
                            <AuthOidcScreen />
                        </AppLayout>
                    </OnlyAnonymous>
                )}
            />

            <Route
                path={routesList.orders}
                element={(
                    <RequireAuth>
                        <AppLayout>
                            <OrdersScreen />
                        </AppLayout>
                    </RequireAuth>
                )}
            />

            <Route
                path={routesList.paymentInfoByOrder}
                element={(
                    <RequireAuth>
                        <AppLayout>
                            <PaymentInfoScreen />
                        </AppLayout>
                    </RequireAuth>
                )}
            />

            <Route
                path={routesList.paymentSuccess}
                element={(
                    <RequireAuth>
                        <AppLayout>
                            <SuccessScreen />
                        </AppLayout>
                    </RequireAuth>
                )}
            />

            <Route
                path={routesList.paymentFailure}
                element={(
                    <RequireAuth>
                        <AppLayout>
                            <FailureScreen />
                        </AppLayout>
                    </RequireAuth>)
                }
            />

            <Route
                path={routesList.sendUserInfo}
                element={
                    <AppLayout>
                        <SendUserInfoScreen />
                    </AppLayout>
                }
            />

            <Route
                path={routesList.userResponse}
                element={
                    <AppLayout>
                        <UserResponseScreen />
                    </AppLayout>
                }
            />

            <Route
                path={routesList.customsDocs}
                element={(
                    <RequireAuth>
                        <AppLayout>
                            <CustomsDocsScreen />
                        </AppLayout>
                    </RequireAuth>)
                }
            />

            <Route
                path={routesList.widgetDemo}
                element={(
                    <AppLayout>
                        <WidgetDemoScreen />
                    </AppLayout>
                )
                }
            />

            <Route
                path={routesList.profile}
                element={(
                    <RequireAuth>
                        <AppLayout>
                            <ProfileScreen />
                        </AppLayout>
                    </RequireAuth>
                )
                }
            />

            {
                isLocalhost && (
                    <Route
                        path={routesList.kit}
                        element={
                            <AppLayout>
                                <KitScreen />
                            </AppLayout>
                        }
                    />
                )
            }

            {/* REDIRECT */}
            <Route
                path="/"
                element={<Navigate to={routesList.orders} />}
            />

            <Route
                path="*"
                element={(
                    <AppLayout>
                        <Screen404 />
                    </AppLayout>
                )}
            />
        </Routes >
    )
}