import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Controller } from 'react-hook-form'
import AnimateHeight from 'react-animate-height'
import { usePrompt } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa'

import { FancyLink } from 'kit/fancy-link'
import { routesList } from 'routes/routes-list'
import { Card, CardContent } from 'kit/card'
import { Input } from 'kit/input'
import { Button } from 'kit/button'
import { H1, H3, Link } from 'kit/typography'
import { InputGroup, BottomHint } from 'kit/input-group'
import { InputMask, MASK } from 'kit/input-mask'
import { GetPersonalInfoV2_ServerResponse } from 'api/typings/get-personal-info-v2'
import { Checkbox } from 'kit/checkbox'
import { ButtonMinimal } from 'kit/button-minimal'
import { Spinner } from 'kit/spinner'
import { Callout } from 'kit/callout'
import { Dropzone } from 'kit/dropzone'
import { ReactComponent as SearchIcon } from 'assets/images/search.svg'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/arrow_left.svg'
import { useMedia } from 'context/media-provider'
import { getFileId, formSwitchIntent, TriggerFormInitially, isLocalhost } from 'utils'

import { useModule } from './use-module'
import { passportTypeEnum } from './helpers'

type DocsByOrderProps = {
    initialModel: GetPersonalInfoV2_ServerResponse
}

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

const Form = styled.form(({ theme }) => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
})

const InputRow = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        marginBottom: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        [theme!.mq.small]: {
            marginBottom: 24,
            alignItems: 'center',
            flexDirection: 'row',
            '> button': {
                marginBottom: 0
            },
        }
    }
})

const DropArea = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        position: 'relative',
        width: '100%',
        marginBottom: 40
    }
})

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
        bottom: -20
    }
})

const InputTitle = styled.p(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '135%',
        flexGrow: 1,
        maxWidth: 200,
        color: theme?.colors.color5,
        marginBottom: 8,

        [theme!.mq.small]: {
            marginBottom: 0
        }
    }
})

const FileTitle = styled.p(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '135%',
        color: theme?.colors.color5,
        marginBottom: 0,

        [theme!.mq.small]: {
            marginBottom: 0
        }
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

const PassportTypesTab = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 'auto',
        marginBottom: 24,
        '> button': {
            marginBottom: 8
        },

        [theme!.mq.small]: {
            flexDirection: 'row',
            '> button': {
                marginBottom: 0
            },
        }
    }
})

const InnBox = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        width: '100%',
        maxWidth: 520,

        [theme!.mq.small]: {
            maxWidth: 246,
            marginRight: 32
        }
    }
})

function DocsByOrder({
    initialModel,
}: DocsByOrderProps) {
    const {
        formProps: {
            control,
            register,
            trigger,
            watch,
            handleSubmit,
            setValue,
            formState: {
                errors,
                dirtyFields,
                isValid,
                isSubmitSuccessful,
                isDirty,
                isSubmitting
            },
        },
        onSubmit,

        isAgreementAccept,
        toggleIsAgreementAccept,

        taxNumberQuery,

        isTaxNumberAvailable,

        sberIdDataQuery,

    } = useModule(initialModel)

    const { isMobile } = useMedia()
    const theme = useTheme()
    const { formatMessage } = useIntl()

    const isDocsRequired = initialModel.metadata.isDocsRequired || watch('docType') === passportTypeEnum.foreign

    // React.useEffect(() => {
    //     const subscription = watch((value, { name, type }) =>
    //         trigger(['name', 'patronymic', 'lastName'])
    //     )
    //     return () => subscription.unsubscribe()
    // }, [watch])

    usePrompt(formatMessage({id: 'app.docs.formUnsavedChanges'}), isDirty)

    return (
        <Frame>
            <CenteredBlock>
                <Title>
                    <FancyLink
                        to={routesList.orders}
                    >
                        <ArrowLeftIcon style={{ marginRight: 4 }} /> <FormattedMessage id='app.goBack' />
                    </FancyLink>
                    <H1
                        style={{
                            textAlign: 'center'
                        }}><FormattedMessage id='app.docs.title' /></H1>
                </Title>

                <Callout intent='danger' size={isMobile ? 'small' : 'big'} style={{ marginBottom: 32 }}>
                    <FormattedMessage id='app.docs.docFillDataCallout' />
                </Callout>

                <Card style={{ marginBottom: 48 }}>
                    <CardContent>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 24
                            }}>
                                <H3 style={{ margin: 0 }}>
                                    <FormattedMessage id='app.docs.personalData' />
                                </H3>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <ButtonMinimal
                                        icon={<FaAddressCard style={{ marginRight: 8 }} />}
                                        onClick={() => {
                                            sberIdDataQuery.refetch()
                                        }}
                                        disabled={sberIdDataQuery.isLoading}
                                        size='small'
                                    >
                                        <FormattedMessage
                                            id='app.docs.fillDataBySberId'
                                        />
                                    </ButtonMinimal>
                                </div>
                            </div>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.surname' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.lastName?.message}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        intent={formSwitchIntent(errors.lastName?.message, dirtyFields.lastName)}
                                        {...register('lastName')}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.name' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.name?.message}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        intent={formSwitchIntent(errors.name?.message, dirtyFields.name)}
                                        {...register('name')}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.patronymic' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.patronymic?.message}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        intent={formSwitchIntent(errors.patronymic?.message, dirtyFields.patronymic)}
                                        {...register('patronymic')}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.birthDate' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.birthDate?.message}
                                >
                                    <Controller
                                        name='birthDate'
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <InputMask
                                                    {...field}
                                                    style={{ width: '100%', marginRight: 16 }}
                                                    mask={MASK.date}
                                                    intent={formSwitchIntent(errors.birthDate?.message, dirtyFields.birthDate)}
                                                />
                                            )
                                        }}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.phone' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        readOnly
                                        intent={'none'}
                                        {...register('phoneNumber')}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.email' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.email?.message}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        //intent={formSwitchIntent(errors.email?.message, dirtyFields.email)}
                                        {...register('email')}
                                        readOnly
                                    />
                                </InputGroup>
                            </InputRow>

                            <H3 style={{ marginRight: 'auto', width: '100%' }}>
                                <FormattedMessage id='app.docs.docs' />
                            </H3>

                            <PassportTypesTab>
                                <Button
                                    type='button'
                                    intent={watch('docType') === passportTypeEnum.rf ? 'primary' : 'none'}
                                    onClick={() => {
                                        setValue('docType', passportTypeEnum.rf, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
                                        setValue('userDocs', [])
                                        trigger(['docSeries', 'docNumber', 'userDocs', 'taxNumber', 'name', 'patronymic', 'lastName'])
                                    }}
                                    style={{ marginRight: 6, borderRadius: 8 }}
                                >
                                    <FormattedMessage id='app.docs.rfPassport' />
                                </Button>
                                <Button
                                    type='button'
                                    intent={watch('docType') === passportTypeEnum.foreign ? 'primary' : 'none'}
                                    onClick={() => {
                                        setValue('docType', passportTypeEnum.foreign, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
                                        trigger(['docSeries', 'docNumber', 'userDocs', 'taxNumber', 'name', 'patronymic', 'lastName'])
                                    }}
                                    style={{ borderRadius: 8 }}
                                >
                                    <FormattedMessage id='app.docs.otherPassport' />
                                </Button>
                            </PassportTypesTab>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.passportSeriesAndNumber' />
                                </InputTitle>
                                <div style={{ position: 'relative', maxWidth: 520, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <div style={{ position: 'relative', maxWidth: 520, display: 'flex' }}>
                                        <InputGroup
                                            intent={'danger'}
                                            disabled={false}
                                            style={{ width: 100, marginRight: 16 }}
                                        >
                                            <Input
                                                style={{ width: '100%', marginRight: 16 }}
                                                intent={formSwitchIntent(errors.docSeries?.message || errors.docNumber?.message, dirtyFields.docSeries || dirtyFields.docNumber)}
                                                {...register('docSeries')}
                                            />
                                        </InputGroup>

                                        <InputGroup
                                            intent={'danger'}
                                            disabled={false}
                                            style={{ width: 120, }}
                                        >
                                            <Input
                                                style={{ width: '100%' }}
                                                intent={formSwitchIntent(errors.docSeries?.message || errors.docNumber?.message, dirtyFields.docSeries || dirtyFields.docNumber)}
                                                {...register('docNumber')}
                                            />
                                        </InputGroup>
                                    </div>
                                    {(errors.docNumber?.message || errors.docSeries?.message) && (
                                        <BottomHint
                                            style={{ marginBottom: 24, color: theme.fns.intentToColor('danger'), top: 52 }}
                                        >
                                            {errors.docSeries?.message || errors.docNumber?.message}
                                        </BottomHint>
                                    )}
                                </div>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.passportDate' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.docDate?.message}
                                >
                                    <Controller
                                        name='docDate'
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <InputMask
                                                    {...field}
                                                    style={{ width: '100%', marginRight: 16 }}
                                                    mask={MASK.date}
                                                    intent={formSwitchIntent(errors.docDate?.message, dirtyFields.docDate)}
                                                />
                                            )
                                        }}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.docOrganization' />
                                </InputTitle>
                                <InputGroup
                                    intent={'danger'}
                                    disabled={false}
                                    style={{ flexGrow: 1, maxWidth: 520 }}
                                    bottomHint={errors.docOrganization?.message}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        intent={formSwitchIntent(errors.docOrganization?.message, dirtyFields.docOrganization)}
                                        {...register('docOrganization')}
                                    />
                                </InputGroup>
                            </InputRow>

                            <InputRow>
                                <InputTitle>
                                    <FormattedMessage id='app.docs.taxNumber' />
                                </InputTitle>
                                <InnBox
                                    style={{ marginBottom: isMobile ? 24 : 0 }}
                                >
                                    <InputGroup
                                        intent={'danger'}
                                        disabled={false}
                                        bottomHint={errors.taxNumber?.message}
                                    >
                                        <Controller
                                            name='taxNumber'
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <InputMask
                                                        {...field}
                                                        style={{ width: '100%' }}
                                                        mask={MASK.taxNumber}
                                                        intent={formSwitchIntent(errors.taxNumber?.message, dirtyFields.taxNumber)}
                                                    />
                                                )
                                            }}
                                        />
                                    </InputGroup>
                                </InnBox>
                                <ButtonMinimal
                                    icon={<SearchIcon />}
                                    onClick={() => {
                                        taxNumberQuery.mutate()
                                    }}
                                    disabled={!isTaxNumberAvailable || taxNumberQuery.isLoading}
                                >
                                    <FormattedMessage
                                        id='app.docs.searchTaxNumber'
                                    />
                                </ButtonMinimal>
                                {taxNumberQuery.isLoading && <Spinner size={17} />}
                            </InputRow>

                            <AnimateHeight
                                height={isDocsRequired ? 'auto' : 0}
                                style={{ width: '100%' }}
                            >
                                <InputRow style={{ marginBottom: 12 }}>
                                    <FileTitle>
                                        <FormattedMessage id='app.dropzone.name' />
                                    </FileTitle>
                                </InputRow>
                                <DropArea>
                                    <Controller
                                        name='userDocs'
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Dropzone
                                                    fileList={field.value}
                                                    intent={!!((errors.userDocs) as any)?.message ? 'danger' : 'none'}
                                                    onFileRemove={(file: File) => {
                                                        const files = field.value.filter((item: File) => getFileId(file) !== getFileId(item))
                                                        setValue('userDocs', files, { shouldDirty: true, shouldValidate: true })
                                                    }}
                                                    onFilesSet={(files: File[]) => {
                                                        setValue('userDocs', files, { shouldDirty: true, shouldValidate: true })
                                                    }}
                                                    maxFiles={1}
                                                    accept='application/pdf,image/png,image/jpeg'
                                                    areaMessage={<FormattedMessage id='app.docs.dropzoneMessage' />}
                                                />
                                            )
                                        }}
                                    />
                                    <DropAreaError>
                                        {((errors.userDocs) as any)?.message}
                                    </DropAreaError>
                                </DropArea>
                            </AnimateHeight>

                            <Button
                                type='submit'
                                disabled={Object.keys(errors).length > 0 || !isAgreementAccept}
                                loading={isSubmitting}
                                style={{ width: '100%', marginBottom: 24 }}
                            >
                                {
                                    initialModel.metadata.isPaymentRequired
                                        ? <FormattedMessage id='app.saveChangesThenGoToPayment' />
                                        : <FormattedMessage id='app.saveChanges' />
                                }
                            </Button>

                            <div
                                style={{ display: 'flex', alignItems: 'start', width: '100%' }}
                            >
                                <Checkbox
                                    checked={isAgreementAccept}
                                    onChange={e => {
                                        toggleIsAgreementAccept(!isAgreementAccept)
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

                            <TriggerFormInitially
                                trigger={trigger}
                            />
                        </Form>
                    </CardContent>
                </Card>
            </CenteredBlock>
        </Frame >
    )
}

export {
    DocsByOrder
}

export type {
    DocsByOrderProps
}
