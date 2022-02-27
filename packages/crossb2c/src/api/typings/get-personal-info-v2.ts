export interface GetPersonalInfoV2_ServerResponse {
    lastName?: string
    name?: string
    patronymic?: string
    birthDate?: string
    phoneNumber?: string
    email?: string
    docType?: string
    docSeries?: string
    docNumber?: string
    docDate?: string
    docOrganization?: string
    taxNumber?: string

    metadata: {
        isPaymentRequired: boolean
        isDocsRequired: boolean
    }
}