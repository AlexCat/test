const routesList = {
    root: '/',
    orders: '/orders',
    profile: '/profile',
    paymentInfoByOrder: '/orders/:trackingNumber/payment',
    kit: '/kit',
    login: '/login',
    loginByPhone: '/login/phone',
    authOidc: '/auth/oids',
    paymentSuccess: '/payment/:trackingNumber/success',
    paymentFailure: '/payment/:trackingNumber/failure',
    sendUserInfo: '/itp/confirm-offer',
    userResponse: '/itp/sp',
    customsDocs: '/customs/:trackingNumber/docs/',
    widgetDemo: '/widget/demo',

    fns: {
        createPaymentInfo: (trackingNumber: string) => `/orders/${trackingNumber}/payment`,
        createCustomsDocs: (trackingNumber: string) => `/customs/${trackingNumber}/docs`,
        createPaymentSuccess: (trackingNumber: string) => `/payment/${trackingNumber}/success`,
        createPaymentFailure: (trackingNumber: string) => `/payment/${trackingNumber}/failure`,
    }
}

const redirectUrlKey = 'redirectUrl'

export {
    routesList,
    redirectUrlKey
}