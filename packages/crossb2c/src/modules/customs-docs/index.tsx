import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Linkify from 'linkify-react'

import { ReactComponent as ArrowLeftIcon } from 'assets/images/arrow_left.svg'
import { GetDocsForCustoms_ServerResponse } from 'api/typings/get-docs-for-customs'
import { PutDocsForCustoms_ServerRequest } from 'api/typings/put-docs-for-customs'
import { useClient } from 'context/auth-context'
import { Checkbox } from 'kit/checkbox'
import { FancyLink } from 'kit/fancy-link'
import { Button } from 'kit/button'
import { Card, CardContent } from 'kit/card'
import { H1, H3, H4, P, P1, Link } from 'kit/typography'
import { routesList } from 'routes/routes-list'
import { Dropzone } from 'kit/dropzone'
import { notify } from 'kit/notify'
import { Callout } from 'kit/callout'
import { getFileId, toBase64, TriggerFormInitially } from 'utils'

type CustomsDocsProps = {
    initialModel: GetDocsForCustoms_ServerResponse,
    trackingNumber: string
}

type FormFields = {
    docs: Array<GetDocsForCustoms_ServerResponse[0] & { files: File[] }>
}

async function exitTransform(formFields: FormFields): Promise<PutDocsForCustoms_ServerRequest> {
    const formPromises = formFields.docs.map(async ({ docTypeId, docTypeName, files }) => {

        const filesPromises = files.map(async (file) => {
            const base64content = await toBase64(file)

            if (typeof base64content !== 'string') {
                throw new Error()
            }

            return {
                docName: file.name,
                docBody: base64content.split('base64,')[1],
                contentType: file.type
            }
        })

        const docs = await Promise.all(filesPromises)

        return {
            docTypeId,
            docTypeName,
            docs
        }
    })

    return Promise.all(formPromises)
}

const schema = yup.object().shape({
    docs: yup
        .array()
        .of(
            yup.object().shape({
                // files: yup
                //     .array()
                //     .of(
                //         yup
                //             .mixed()
                //             .test('asdasdas', 'ecah', function (x, context) {
                //                 return context.parent.length <= 4
                //             })
                //     )

                files: yup
                    .array()
                    .min(1, 'Приложите как минимум один файл')
                    .max(4, 'Вы можете приложить не более четырех файлов')
            })
        )
})


// copy
const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    }
})

const Title = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        width: '100%',
        margin: '32px 0 0 0',
        textAlign: 'center',

        [theme!.mq.small]: {
            margin: '40px 0 0 0',
            '> a': {
                width: '100%',
                marginBottom: 0,
            },
        }
    }
})

// copy
const CenteredBlock = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'calc(100% - 48px)',
        maxWidth: 770,
    }
})

// copy
const DropArea = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        position: 'relative',
        width: '100%',
        marginBottom: 40,

        [theme!.mq.small]: {
            marginBottom: 48
        }
    }
})

// copy
const DropAreaError = styled.p(({ theme }: {
    theme?: Theme
}) => {
    return {
        position: 'absolute',
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: '-0.45px',
        marginBottom: 3,
        color: theme?.colors.color6,
        textAlign: 'center',
        width: '100%',
        bottom: -24
    }
})

function CustomsDocs({
    initialModel,
    trackingNumber
}: CustomsDocsProps) {
    const client = useClient()
    const { formatMessage } = useIntl()
    const navigate = useNavigate()
    const [isAgreementAccept, setIsAgreementAccept] = React.useState(false)
    const theme = useTheme()

    const {
        control,
        getValues,
        trigger,
        setError,
        formState: {
            isSubmitting,
            isValid,
            errors
        },
        handleSubmit
    } = useForm<FormFields>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            docs: initialModel.map(({ docTypeId, docTypeName, comment }) => ({ docTypeId, docTypeName, comment, files: [] }))
        }
    })

    const { fields } = useFieldArray({
        control,
        name: 'docs',
    })

    const saveQuery = useMutation(async () => {
        let correctValues: PutDocsForCustoms_ServerRequest

        try {
            correctValues = await exitTransform(getValues())
        } catch {
            notify({
                message: 'Не удалось преобразовать файл',
                type: 'error'
            })

            throw new Error()
        }

        return client.putDocsForCustoms(trackingNumber, correctValues)
    }, {
        onSuccess: response => {
            notify({
                message: formatMessage({ id: 'app.docs.formUpdateSuccess' }),
                type: 'success'
            })
            navigate(routesList.orders)
        },
        onError: (e: HttpErrorResponse) => {
            try {
                if (e.response?.data?.title) {
                    notify({
                        message: e.response?.data?.title,
                        type: 'error'
                    })
                }

                fields.map((field, i) => {
                    const serverError = e.response?.data.errors.find(x => Number(x.fieldName) === field.docTypeId)
                    if (serverError) {
                        setError(`docs.${i}.files`, {
                            type: 'required',
                            message: serverError.message?.join(', ') || 'Ошибка'
                        }, { shouldFocus: true })
                    }
                })

            } catch (e) {
                notify({
                    message: formatMessage({ id: 'app.docs.formUpdateError' }),
                    type: 'error'
                })
            }
        }
    })

    return (
        <Frame>
            <CenteredBlock>
                <Title>
                    <FancyLink
                        to={routesList.orders}
                    >
                        <ArrowLeftIcon style={{ marginRight: 4 }} /> <FormattedMessage id='app.goBack' />
                    </FancyLink>
                    <H1 style={{ textAlign: 'center' }}>
                        <FormattedMessage id='app.customsDocs.title' />
                    </H1>
                </Title>
                <Card style={{ marginBottom: 48 }}>
                    <CardContent>
                        <form onSubmit={handleSubmit(async (x) => await saveQuery.mutateAsync())}>
                            <H3>
                                <FormattedMessage id='app.customsDocs.subTitle' />
                            </H3>
                            {fields.map((field, index) => {
                                return (
                                    <React.Fragment key={field.id}>
                                        <H4 style={{ marginBottom: 0 }}>
                                            {field.docTypeName}
                                        </H4>

                                        {/* {field.comment && (
                                            <Callout
                                                style={{ marginBottom: 12 }}
                                                size='small'
                                                intent='warning'
                                            >
                                                {field.comment}
                                            </Callout>
                                        )} */}

                                        {field.comment && (
                                            <P1 style={{ marginBottom: 16 }}>
                                                <Linkify
                                                    tagName={'span'}
                                                    options={{
                                                        attributes: {
                                                            style: { color: theme.colors.color3 }
                                                        },
                                                        target: '_blank',
                                                    }}
                                                >
                                                    {field.comment}
                                                </Linkify>
                                            </P1>
                                        )}

                                        <Controller
                                            name={`docs.${index}.files` as const}
                                            control={control}
                                            render={({ field, fieldState, formState }) => {

                                                // не удалять
                                                // let possibleMessage = ''
                                                // if (Array.isArray(fieldState.error)) {
                                                //     possibleMessage = fieldState.error.map(x => x?.message).join(', ')
                                                // }

                                                return (
                                                    <DropArea>
                                                        <Dropzone
                                                            containerRef={field.ref}
                                                            fileList={field.value}
                                                            intent={fieldState.invalid ? 'danger' : 'none'}
                                                            onFileRemove={(file: File) => {
                                                                const files = field.value.filter((item: File) => getFileId(file) !== getFileId(item))
                                                                field.onChange(files)
                                                                field.onBlur()
                                                            }}
                                                            onFilesSet={(files: File[]) => {
                                                                field.onChange(files)
                                                                field.onBlur()
                                                            }}
                                                            minSize={10240} // 10 КБ
                                                            maxFiles={4}
                                                            validate={files => {
                                                                const hasInvalidNames = files.filter(x => {
                                                                    const safeNameLength = (x.name?.split('.')[0] || '').length
                                                                    return safeNameLength < 1 || safeNameLength >= 512
                                                                })

                                                                if (hasInvalidNames.length > 0) {
                                                                    hasInvalidNames.forEach(file => {
                                                                        notify({
                                                                            message: formatMessage({ id: 'app.dropzone.fileNameLimit' }, { value: file.name }),
                                                                            type: 'error'
                                                                        })
                                                                    })

                                                                    return false
                                                                }

                                                                return true
                                                            }}
                                                            /**
                                                             * https://github.com/react-dropzone/react-dropzone/issues/276
                                                             * какие-то проблемы с видимостью в проводнике application/msword, 
                                                             * приходится дополнительно использовать .doc и .docx
                                                             */
                                                            accept={[
                                                                '.doc',
                                                                '.docx',
                                                                'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'application/pdf',
                                                                'image/jpeg'
                                                            ]}
                                                            areaMessage={<FormattedMessage id='app.customsDocs.dropzoneMessage' />}
                                                        />
                                                        <DropAreaError>
                                                            {fieldState.error?.message}
                                                        </DropAreaError>
                                                    </DropArea>
                                                )
                                            }}
                                        />
                                    </React.Fragment>
                                )
                            })}

                            <Button
                                type='submit'
                                disabled={!isValid || !isAgreementAccept}
                                loading={isSubmitting}
                                style={{ width: '100%', marginBottom: 24 }}
                            >
                                <FormattedMessage id='app.customsDocs.sendDocuments' />
                            </Button>
                        </form>

                        <div
                            style={{ display: 'flex', alignItems: 'start', width: '100%' }}
                        >
                            <Checkbox
                                checked={isAgreementAccept}
                                onChange={e => {
                                    setIsAgreementAccept(!isAgreementAccept)
                                }}
                                style={{ marginRight: 12 }}
                            />
                            <span style={{ fontSize: 13, lineHeight: '150%' }}>
                                <FormattedMessage
                                    id='app.docs.agreement'
                                    values={{
                                        link1: (chunks: any) => (<Link intent="success" target='_blank' href="/documents/oferta.pdf">{chunks}</Link>)
                                    }}
                                />
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </CenteredBlock>

            <TriggerFormInitially trigger={trigger} />
        </Frame>
    )
}

export {
    CustomsDocs
}

