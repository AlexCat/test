import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { useMutation, useQuery } from 'react-query'
import { parse, isDate, isValid, addYears, format, parseISO } from 'date-fns'
import { AxiosResponse } from 'axios'
import debounce from 'debounce-promise'

import { notify } from 'kit/notify'
import { routesList } from 'routes/routes-list'
import { useClient } from 'context/auth-context'
import { GetPersonalInfoV2_ServerResponse } from 'api/typings/get-personal-info-v2'
import { PutPersonalInfoV2_ServerRequest } from 'api/typings/put-personal-info-v2'
import { GetPersonalBySberId_ServerResponse } from 'api/typings/get-personal-by-sber-id'
import { toBase64, capitalizeFirstLetter } from 'utils'

import { passportTypeEnum } from './helpers'
import { UserFormModel } from './types'

const passportSeriesRegex = /\d{4}/
const passportNumberRegex = /\d{6}/

const latinWordReqex = /[A-Za-z]/
const russainWordRegex = /[аА-яЯ]/
const digitRegex = /[0-9]/

const nowMinus16years = addYears(new Date(), -16)

const dateFormat = 'dd.MM.yyyy'

function isTiret(value: string) {
    return ['-', '—', '–', '—'].includes(value)
}

function parseDateString(value: any, originalValue: string) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, dateFormat, new Date())

    return parsedDate
}

const today = new Date()


class PassportCache {
    cache: { passport: string, isInvalid: boolean }[] = []

    add(passport: string, isInvalid: boolean) {
        this.cache.push({ passport, isInvalid })
    }

    find(passport: string) {
        return this.cache.find(x => x.passport === passport)
    }
}

const cache = new PassportCache()

function checkName(docType: any, scopedSchema: any, nullable?: boolean) {
    const cyrrilicFIOReqex = /(^[аА-яЯ]+((\s|[\-\—\–\—]){0,1})[аА-яЯ]*((\s|[\-\—\–\—]){0,1})[аА-яЯ]+$)|^[аА-яЯ]+$/gm

    const latinFIOReqex = /(^[aA-zZ]+((\s|[\-\—\–\—]){0,1})[aA-zZ]*((\s|[\-\—\–\—]){0,1})[aA-zZ]+$)|^[aA-zZ]+$/gm

    return docType === passportTypeEnum.rf ?
        scopedSchema
            .test('only-russian-letters', 'Допускаются только русские символы', function (value: string) {
                if (!value && nullable) {
                    return true
                }

                if (cyrrilicFIOReqex.test(value)) {
                    return true
                }

                return false
            }) :
        scopedSchema
            .test('only-russian-or-lation-or-tiret', 'Допускаются только русские или латинские символы', function (value: string) {
                if (!value && nullable) {
                    return true
                }

                if (latinWordReqex.test(value) && russainWordRegex.test(value)) { // проверка на смешение
                    return false
                }

                if (latinFIOReqex.test(value) || cyrrilicFIOReqex.test(value)) {
                    return true
                }

                return false
            })
}

function onlySameAlphabet(words: (string | null)[]) {
    const stripped = words
        .map(x => x ? x.trim() : x)
        .filter(x => x)

    return stripped.every(x => russainWordRegex.test(x!)) || stripped.every(x => latinWordReqex.test(x!))
}

function checkPassportOnline(docSeries: string | undefined, validate: (x: string) => Promise<AxiosResponse<[{ isInvalid: boolean }]>>) {
    return async function (docNumber?: string) {
        if (!docSeries || !docNumber) {
            return Promise.resolve(false)
        }

        if (docSeries?.includes('_') || docNumber?.includes('_')) {
            return Promise.resolve(false)
        }

        const passport = docSeries! + docNumber!

        const cachedResult = cache.find(passport)
        if (cachedResult) {
            return Promise.resolve(!cachedResult.isInvalid)
        }

        return validate(passport).then(x => {
            cache.add(passport, x.data[0].isInvalid)
            return !x.data[0].isInvalid
        }).catch(x => false)
    }
}

function checkTaxNumberDigit(inn: any, coefficients: number[]) {
    let n = 0
    for (let i in coefficients) {
        n += coefficients[i] * inn[i]
    }
    return n % 11 % 10
}


function convertToISOString(date?: string): string | undefined {
    if (!date) {
        return date
    }

    const target = parse(date!, dateFormat, new Date())

    return `${target.getFullYear()}-${(target.getMonth() + 1).toString().padStart(2, '0')}-${target.getDate().toString().padStart(2, '0')}T00:00:00.000Z`
}

function detectWhitespaces(str?: string) {
    if (!str) {
        return true
    }

    if (str.trim() === '') {
        return false
    }

    return str.trim().length === str.length
}

function toMaskDate(date?: string): string | undefined {
    return date ? format(parseISO(date), dateFormat) : date
}

function enterTransform(initialModel: GetPersonalInfoV2_ServerResponse): UserFormModel {
    return {
        ...initialModel,

        docType: initialModel.docType ?? passportTypeEnum.rf,
        birthDate: toMaskDate(initialModel.birthDate),
        docDate: toMaskDate(initialModel.docDate),

        userDocs: []
    }
}

async function exitTransform(exitModel: UserFormModel): Promise<PutPersonalInfoV2_ServerRequest> {
    const { metadata, userDocs, ...others } = exitModel

    const result: PutPersonalInfoV2_ServerRequest = {
        ...others,

        patronymic: exitModel.patronymic ? exitModel.patronymic : null,
        taxNumber: exitModel.taxNumber ? exitModel.taxNumber : null,
        birthDate: convertToISOString(exitModel.birthDate),
        docDate: convertToISOString(exitModel.docDate),
    }

    if (userDocs.length === 1) {
        const doc = userDocs[0]

        let base64content = await toBase64(doc)

        if (typeof base64content === 'string') {
            result.document = {
                docName: doc.name,
                docBody: base64content.split('base64,')[1],
                contentType: doc.type
            }

            return result
        }
    }

    return result
}


function correctTaxnumberChecksum(value?: string, nullable?: boolean) {
    if (nullable && !value) {
        return true
    }

    const inn = value?.toString() || ''
    let result = false

    const n11 = checkTaxNumberDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
    const n12 = checkTaxNumberDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])

    if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
        result = true
    }

    return result
}

function correctTaxnumberCorrectFormat(value?: string, nullable?: boolean) {
    if (nullable && !value) {
        return true
    }

    const inn = value?.toString()
    if (!inn) {
        return false
    }
    if (!inn.length) {
        return false
    } else if (/[^0-9]/.test(inn)) {
        return false
    } else if (inn.length !== 12) {
        return false
    } else if (inn === '000000000000') {
        return false
    }

    return true
}

function useModule(initialModel: GetPersonalInfoV2_ServerResponse) {
    const { formatMessage } = useIntl()
    const client = useClient()
    const navigate = useNavigate()

    const { current: checkPassportDebounced } = React.useRef(debounce(x => client.checkPassport(x), 150))

    const { current: schema } = React.useRef(yup.object().shape({
        lastName: yup
            .string()
            .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.lastName' }))
            .max(128, formatMessage({ id: 'app.docs.validateErrorMessage.lastName' }))
            .test('detectWhitespaces', formatMessage({ id: 'app.docs.validateErrorMessage.noWhitespaces' }), detectWhitespaces)
            // .test('onlySameAlphabet', "смешение букв", function (x, context) {
            //     return onlySameAlphabet([
            //         x,
            //         context.parent.name,
            //         context.parent.patronymic
            //     ])
            // })
            .when('docType', (docType: any, scopedSchema: any) => checkName(docType, scopedSchema))
            .required(formatMessage({ id: 'app.docs.validateErrorMessage.lastName' })),
        name: yup
            .string()
            .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.name' }))
            .max(128, formatMessage({ id: 'app.docs.validateErrorMessage.name' }))
            .test('detectWhitespaces', formatMessage({ id: 'app.docs.validateErrorMessage.noWhitespaces' }), detectWhitespaces)
            // .test('onlySameAlphabet', "смешение букв", function (x, context) {
            //     return onlySameAlphabet([
            //         x,
            //         context.parent.lastName,
            //         context.parent.patronymic
            //     ])
            // })
            .when('docType', (docType: any, scopedSchema: any) => checkName(docType, scopedSchema))
            .required(formatMessage({ id: 'app.docs.validateErrorMessage.name' })),
        patronymic: yup
            .string()
            .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.patronymic' }))
            .max(128, formatMessage({ id: 'app.docs.validateErrorMessage.patronymic' }))
            .test('detectWhitespaces', formatMessage({ id: 'app.docs.validateErrorMessage.noWhitespaces' }), detectWhitespaces)
            .when('docType', (docType: any, scopedSchema: any) => checkName(docType, scopedSchema, true))
            // .test('onlySameAlphabet', "смешение букв", function (x, context) {
            //     return onlySameAlphabet([
            //         x,
            //         context.parent.name,
            //         context.parent.lastName
            //     ])
            // })
            .nullable()
            .optional(),
        birthDate: yup
            .date()
            .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.birthDate.typeError' }))
            .transform(parseDateString)
            .max(nowMinus16years, formatMessage({ id: 'app.docs.validateErrorMessage.birthDate.max' }))
            .required(),
        // email: yup
        //     .string()
        //     .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.email' }))
        //     .trim()
        //     .email(formatMessage({ id: 'app.docs.validateErrorMessage.email' }))
        //     .max(128, formatMessage({ id: 'app.docs.validateErrorMessage.email' }))
        //     .required(formatMessage({ id: 'app.docs.validateErrorMessage.email' })),
        docSeries: yup
            .string()
            .typeError('Поля обязательны для заполнения')
            .test('detectWhitespaces', formatMessage({ id: 'app.docs.validateErrorMessage.noWhitespaces' }), detectWhitespaces)
            .when('docType', (docType, scopedSchema) => {
                return docType === passportTypeEnum.rf ?
                    scopedSchema
                        .length(4, formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber' }))
                        .matches(passportSeriesRegex, formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber' }))
                        .required(formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber' })) :
                    scopedSchema
                        .max(10, 'Допускается не более 10 символов')
                        .test('russian-or-lation-or-digit-or-tiret', 'Допускается использование цифр, букв русского или английского алфавита', function (value: string) {
                            if (value.length === 1 && isTiret(value)) {
                                return true
                            }

                            if (latinWordReqex.test(value) && russainWordRegex.test(value)) {
                                return false
                            }

                            if (value.split('').every(x => latinWordReqex.test(x) || russainWordRegex.test(x) || digitRegex.test(x))) {
                                return true
                            }

                            return false
                        })
                        .test('warning-if-null', 'Если у документа нет серии, то введите тире', function (value: string) {
                            if (!value) {
                                return false
                            }

                            return true
                        })
            }),
        docNumber: yup
            .string()
            .typeError('Поле "Номер" обязательно для заполнения')
            .test('detectWhitespaces', formatMessage({ id: 'app.docs.validateErrorMessage.noWhitespaces' }), detectWhitespaces)
            .when('docType', (docType, scopedSchema) => {
                return docType === passportTypeEnum.rf ?
                    scopedSchema
                        .length(6, formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber' }))
                        .matches(passportNumberRegex, formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber' }))
                        .required(formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber' })) :
                    scopedSchema
                        .max(32, 'Допускается не более 32 символов')
                        .test('russian-or-lation-or-digit', 'Допускается использование цифр, букв русского или английского алфавита', function (value: string) {
                            if (latinWordReqex.test(value) && russainWordRegex.test(value)) {
                                return false
                            }

                            if (value.split('').every(x => latinWordReqex.test(x) || russainWordRegex.test(x) || digitRegex.test(x))) {
                                return true
                            }

                            return false
                        })
                        .required('Поле "Номер" обязательно для заполнения')
            })
            // @ts-ignore
            .when(['docType', 'docSeries'], (docType, docSeries, scopedSchema) => {
                return docType === passportTypeEnum.rf ?
                    scopedSchema.test(
                        'correct-passport-credentials-online',
                        formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumber.invalidOnline' }),
                        checkPassportOnline(docSeries, checkPassportDebounced) // замыкание не убирать, т.к. теряется контекст вызова
                    ) :
                    scopedSchema
                        .min(1, formatMessage({ id: 'app.docs.validateErrorMessage.docSeriesAndNumberForeignMin' }))
            }),


        docDate: yup
            .date()
            .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.docDate' }))
            .transform(parseDateString)
            .max(today, formatMessage({ id: 'app.docs.validateErrorMessage.docDate' }))
            .when('birthDate', (birthDate, scopedSchema) => {
                return isValid(birthDate) ? scopedSchema.min(birthDate, formatMessage({ id: 'app.docs.validateErrorMessage.docDate' })) : scopedSchema
            })
            .required(),
        docOrganization: yup
            .string()
            .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.docOrganization' }))
            .max(128, formatMessage({ id: 'app.docs.validateErrorMessage.docOrganization' }))
            .test('detectWhitespaces', formatMessage({ id: 'app.docs.validateErrorMessage.noWhitespaces' }), detectWhitespaces)
            .required(formatMessage({ id: 'app.docs.validateErrorMessage.docOrganization' })),
        taxNumber: yup
            .string()
            .when('docType', (docType, scopedSchema) => {
                if (docType === passportTypeEnum.rf) {
                    return scopedSchema
                        .typeError(formatMessage({ id: 'app.docs.validateErrorMessage.taxNumber' }))
                        .test('correct-taxnumber-correct-format', formatMessage({ id: 'app.docs.validateErrorMessage.taxNumberNotCorrectFormat' }), correctTaxnumberCorrectFormat)
                        .test('correct-taxnumber-checksum', formatMessage({ id: 'app.docs.validateErrorMessage.taxNumber' }), correctTaxnumberChecksum)
                        .required('Некорректный формат ИНН')
                } else {
                    return scopedSchema
                        .test('correct-taxnumber-correct-format', formatMessage({ id: 'app.docs.validateErrorMessage.taxNumberNotCorrectFormat' }), (x: string) => correctTaxnumberCorrectFormat(x, true))
                        .test('correct-taxnumber-checksum', formatMessage({ id: 'app.docs.validateErrorMessage.taxNumber' }), (x: string) => correctTaxnumberChecksum(x, true))
                        .nullable()
                        .optional()
                }
            })
        ,
        userDocs: yup
            .array()
            .when('docType', (docType, scopedSchema) => {
                if (initialModel.metadata.isDocsRequired || docType === passportTypeEnum.foreign) {
                    return scopedSchema
                        .min(1, formatMessage({ id: 'app.docs.noFilesError' }))
                }

                return scopedSchema
            })


    }))

    const [isAgreementAccept, setIsAgreementAccept] = React.useState(false)

    const formProps = useForm<UserFormModel>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: enterTransform(initialModel)
    })

    const updateQuery = useMutation(async () => {
        let correctValues: PutPersonalInfoV2_ServerRequest

        try {
            correctValues = await exitTransform(formProps.getValues()) // если брать из Объекта data, то даты (в смысле дни) почему-то приведены к объекту Date!
        } catch {
            notify({
                message: 'Не удалось преобразовать файл',//formatMessage({ id: 'app.docs.failFileConvert' }),
                type: 'error'
            })

            throw new Error()
        }

        return client.saveProfile(correctValues)
    }, {
        onSuccess: response => {
            formProps.reset()

            notify({
                message: formatMessage({ id: 'app.docs.formUpdateSuccess' }),
                type: 'success'
            })

            setTimeout(() => {
                navigate(routesList.orders)
            }, 100)
        },
        onError: (e: HttpErrorResponse<keyof GetPersonalInfoV2_ServerResponse>) => {
            try {
                if (e.response?.data?.title) {
                    notify({
                        message: e.response?.data?.title,
                        type: 'error'
                    })
                }

                e.response?.data.errors?.forEach(x => {
                    formProps.setError(x.fieldName!, {
                        type: 'required',
                        message: x.message?.join(', ')
                    }, { shouldFocus: true })
                })
            } catch (e) {
                notify({
                    message: formatMessage({ id: 'app.docs.formUpdateError' }),
                    type: 'error'
                })
            }
        }
    })

    const taxNumberQuery = useMutation(() => {
        const values = formProps.getValues()
        return client.getTaxNumber({
            birthDate: convertToISOString(values.birthDate)!,
            docType: values.docType!,
            lastName: values.lastName?.trim()!,
            name: values.name?.trim()!,
            passportNumber: values.docSeries! + values.docNumber!,

            docDate: convertToISOString(values.docDate), // optional
            middleName: values.patronymic?.trim(), // optional
        })
    }, {
        onSuccess: response => {
            formProps.setValue('taxNumber', response.data.taxNumber, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            })
            notify({
                message: formatMessage({ id: 'app.docs.getInnSuccess' }, { value: response.data.taxNumber }),
                type: 'success'
            })
        },
        onError: (e: HttpErrorResponse) => {
            notify({
                message: e?.response?.data?.title || formatMessage({ id: 'app.docs.getInnError' }),
                type: 'error'
            })
        }
    })

    const sberIdDataQuery = useQuery<AxiosResponse<GetPersonalBySberId_ServerResponse>, HttpErrorResponse>(client.getPersonalInfoBySberId.toString(), () => {
        return client.getPersonalInfoBySberId()
    }, {
        enabled: false,
        onSuccess: response => {
            const formFields =
                enterTransform({ ...response.data, ...{ metadata: { isDocsRequired: true, isPaymentRequired: true } } })

            function normalizeSberIdValues(field: keyof typeof formFields, value: string) {
                switch (field) {
                    case 'email': return value.toLowerCase()
                    case 'docType': return value
                    default: return capitalizeFirstLetter(value)
                }
            }

            Object
                .entries(formFields)
                .filter(x => typeof x[1] == 'string')
                .forEach(x => {
                    const field = x[0] as keyof typeof formFields
                    formProps.setValue(
                        field,
                        x[1],
                        {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: false
                        }
                    )
                })

            formProps.trigger()

            notify({
                message: formatMessage({ id: 'app.docs.formSbedIdUpdateSuccess' }),
                type: 'success'
            })
        },
        onError: response => {
            notify({
                message: formatMessage({ id: 'app.docs.formSbedIdUpdateError' }),
                type: 'error'
            })
        }
    })

    const trigger = formProps.trigger
    const birthDate = useWatch({ control: formProps.control, name: 'birthDate' })
    React.useEffect(() => {
        trigger('docDate')
    }, [birthDate, trigger])

    const docSeries = useWatch({ control: formProps.control, name: 'docSeries' })
    React.useEffect(() => {
        trigger('docNumber')
    }, [docSeries, trigger])

    const onSubmit = async () => {
        try {
            updateQuery.mutateAsync()
        } catch (e) {

        }
    }

    const isTaxNumberAvailable = (
        !formProps.formState.errors.birthDate &&
        formProps.getValues('docType') === passportTypeEnum.rf &&
        !formProps.formState.errors.lastName &&
        !formProps.formState.errors.name &&
        !formProps.formState.errors.docSeries &&
        !formProps.formState.errors.docNumber
    )

    return {
        formProps,

        onSubmit,

        isAgreementAccept,
        toggleIsAgreementAccept: setIsAgreementAccept,

        taxNumberQuery,

        isTaxNumberAvailable,

        sberIdDataQuery,
    }
}

export {
    useModule
}
