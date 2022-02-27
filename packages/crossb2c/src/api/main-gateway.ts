import { AxiosInstance, AxiosResponse } from 'axios'

import client from './client'

import { GetPreAuthInfo_ServerResponse } from './typings/get-pre-auth-info'
import { Shipment } from './typings/get-shipments'
import { GetPersonalInfo_ServerResponse } from './typings/get-personal-info'
import { GetPersonalInfoV2_ServerResponse } from './typings/get-personal-info-v2'
import { PutPersonalInfoV2_ServerRequest } from './typings/put-personal-info-v2'
import { GetPaymentInfo_ServerResponse } from './typings/get-payment-info'
import { GetPaymentUrl_ServerRequest, GetPaymentUrl_ServerResponse } from './typings/get-payment-url'
import { GetTaxNumber_ServerRequest } from './typings/get-tax-number'
import { GetDocsForCustoms_ServerResponse } from './typings/get-docs-for-customs'
import { PutDocsForCustoms_ServerRequest } from './typings/put-docs-for-customs'
import { GetPersonalBySberId_ServerResponse } from './typings/get-personal-by-sber-id'

type MainGatewayProps = {
    baseUrl: string,
    token: string,
    updateToken: () => any
}

class MainGateway {

    client: AxiosInstance

    constructor({
        baseUrl,
        token,
        updateToken
    }: MainGatewayProps) {
        this.client = client({ baseUrl, token, updateToken })
    }

    getPreAuthInfo(): Promise<AxiosResponse<GetPreAuthInfo_ServerResponse>> {
        return this.client.post('/api/v1/auth/pre-auth')
    }

    sendAuthSMS(phone: string): Promise<AxiosResponse<{ expiresIn: number, retryInterval: number }>> {
        return this.client.post(`/api/v1/auth/send-code`, { phone })
    }

    sendOidcInfo(authCode: string): Promise<AxiosResponse<{}>> {
        return Promise.resolve({ config: {}, data: {}, status: 200, statusText: "ok", headers: {}, })
    }

    getOrders(): Promise<AxiosResponse<Shipment[]>> {
        return this.client.get('/api/v1/shipments')
    }

    getPaymentInfo(trackingNumber: string): Promise<AxiosResponse<GetPaymentInfo_ServerResponse>> {
        return this.client.get(`/api/v1/shipments/${trackingNumber}/payment-info`)
    }

    getPaymentUrl({
        trackingNumber,
        returnUrl,
        failUrl
    }: GetPaymentUrl_ServerRequest): Promise<AxiosResponse<GetPaymentUrl_ServerResponse>> {
        const data = { returnUrl, failUrl }
        return this.client.post(`/api/v1/shipments/${trackingNumber}/payment`, data)
    }

    getDocsByTrackingNumber(trackingNumber: string): Promise<AxiosResponse<GetPersonalInfo_ServerResponse>> {
        return this.client.get(`/api/v1/shipments/${trackingNumber}/personal`)
    }

    getDocsByTrackingNumberV2(trackingNumber: string): Promise<AxiosResponse<GetPersonalInfoV2_ServerResponse>> {
        return this.client.get(`/api/v2/shipments/${trackingNumber}/personal`)
    }

    updateDocsByTrackingNumber(trackingNumber: string, data: GetPersonalInfo_ServerResponse): Promise<AxiosResponse<GetPersonalInfo_ServerResponse>> {
        return this.client.put(`/api/v1/shipments/${trackingNumber}/personal`, data)
    }

    getProfile(): Promise<AxiosResponse<GetPersonalInfoV2_ServerResponse>> {
        return this.client.get(`/api/v2/personal`)
    }

    saveProfile(data: PutPersonalInfoV2_ServerRequest): Promise<AxiosResponse> {
        return this.client.put(`/api/v2/personal`, data)
    }

    getTaxNumber(data: GetTaxNumber_ServerRequest): Promise<AxiosResponse<{ taxNumber: string }>> {
        return this.client.post(`/api/v1/personal/search/taxnumber`, data)
    }

    checkPassport(passportSeriesNumber: string): Promise<AxiosResponse<[{ isInvalid: boolean }]>> {
        return this.client.post(`/api/v1/personal/check-passports`, [passportSeriesNumber])
    }

    postPaymentStatus(rbsPaymentId: string, status: 'SUCCESS' | 'FAIL'): Promise<AxiosResponse> {
        return this.client.post(`/api/v1/payments/status`, { rbsPaymentId, status })
    }

    async getDocsForCustoms(trackingNumber: string): Promise<AxiosResponse<GetDocsForCustoms_ServerResponse>> {
        return this.client.get(`/api/v1/shipments/${trackingNumber}/required-docs`)
    }

    async putDocsForCustoms(trackingNumber: string, data: PutDocsForCustoms_ServerRequest): Promise<AxiosResponse> {
        // debugger
        // return Promise.resolve({
        //     config: {},
        //     data: null,
        //     status: 200,
        //     statusText: "ok",
        //     headers: {},
        // })

        return this.client.put(`/api/v1/shipments/${trackingNumber}/required-docs`, data)
    }

    async getPersonalInfoBySberId(): Promise<AxiosResponse<GetPersonalBySberId_ServerResponse>> {
        return this.client.get(`/api/v1/personal/sberid`)
    }
}

export {
    MainGateway
}