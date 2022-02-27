import { GetPersonalInfoV2_ServerResponse } from './get-personal-info-v2'

export type GetPersonalBySberId_ServerResponse = Omit<GetPersonalInfoV2_ServerResponse, 'metadata'> 

