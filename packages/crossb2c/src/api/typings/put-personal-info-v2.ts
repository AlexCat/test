export interface PutPersonalInfoV2_ServerRequest {
    lastName?: string
    name?: string
    patronymic: string | null
    birthDate?: string
    phoneNumber?: string
    email?: string
    docType?: string
    docSeries?: string
    docNumber?: string
    docDate?: string
    docOrganization?: string
    taxNumber: string | null
    document?: {
        docName: string    
        docBody: string
        contentType: string
    }
}

