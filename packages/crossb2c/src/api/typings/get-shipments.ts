export interface Shipment {
    senderName: string
    referenceNumber: string
    trackingNumber: string
    orderDate: string
    isAdditionalDocumentsRequired: boolean
    isCustomsDutyRequired: boolean
    isPersonalDataRequired: boolean
    orderList: Good[] | null
}

export interface Good {
    name: string
    price?: number
    priceCurrency: string
}