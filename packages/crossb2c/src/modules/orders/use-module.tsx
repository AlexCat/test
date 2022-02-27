import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useQueryParams, StringParam } from 'use-query-params'

import { useClient } from 'context/auth-context'

import {
    stringToDocumentNumberType
} from './shared'

const schema = yup.object().shape({
    searchString: yup.string().required(),
    searchStringType: yup.mixed().oneOf(['trackNumber', 'INN']).required(),
    common: yup.string()
})

function useModule() {
    const client = useClient()

    return { }
}

export {
    useModule
}