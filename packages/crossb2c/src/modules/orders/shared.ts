import { assertUnreachable } from 'utils'

function documentNumberTypeToString(type: DocumentNumberType) : string {
    switch (type) {
        case 'INN': return 'INN'
        case 'trackNumber': return 'trackNumber'
        default: assertUnreachable(type)
    }
}

function stringToDocumentNumberType(str?: string | null): DocumentNumberType | undefined {
    switch (str) {
        case 'INN': return 'INN'
        case 'trackNumber': return 'trackNumber'
        default: return undefined
    }
}

export {
    documentNumberTypeToString,
    stringToDocumentNumberType
}