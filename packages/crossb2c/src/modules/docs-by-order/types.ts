import { GetPersonalInfoV2_ServerResponse } from 'api/typings/get-personal-info-v2'

export type UserFormModel = {
    userDocs: File[]
} & GetPersonalInfoV2_ServerResponse