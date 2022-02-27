export interface GetPaymentUrl_ServerResponse {
    formUrl: string
}

export interface GetPaymentUrl_ServerRequest {
    trackingNumber: string,
    returnUrl: string,
    failUrl: string
}