export interface GetPreAuthInfo_ServerResponse {
    clientId: string,
    clientType: string,
    nonce: string,
    responseType: string,
    scope: string,
    state: string
}