export interface GetPaymentInfo_ServerResponse {
    description?: string
    customsTax: number
    customsFixFee: number
    serviceFeeWithoutVat: number
    vatPrice: number
    currency: string
}