import { GetDocsForCustoms_ServerResponse } from './get-docs-for-customs'

type Item = Pick<GetDocsForCustoms_ServerResponse[0], 'docTypeId' | 'docTypeName'> & {
    docs: Array<{
        docName: string
        docBody: string
        contentType: string
    }>
}

export type PutDocsForCustoms_ServerRequest = Array<Item>