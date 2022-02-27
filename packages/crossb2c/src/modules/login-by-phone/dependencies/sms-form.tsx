import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'context/auth-context'
import { useClient } from 'context/auth-context'
import { InputMask, MASK } from 'kit/input-mask'
import { InputGroup } from 'kit/input-group'
import { H4, P } from 'kit/typography'
import { ButtonMinimal } from 'kit/button-minimal'
import { notify } from 'kit/notify'
import { routesList } from 'routes/routes-list'

import { useCountdown } from './use-countdown'

type SmsFormProps = {
    reset: () => void
    stopTimeInSeconds: number
    resetTimeInSeconds: number
    phone: string
}

const Frame = styled.div(({ theme }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const ButtonLink = styled.button(({ theme }) => {
    return {
        border: 0,
        margin: 0,
        background: 0,
        padding: 0,
        fontSize: 13,
        marginBottom: 6,
        borderBottom: '1px dashed #333',
        ':not([disabled])': {
            cursor: 'pointer'
        }
    }
})

const schema = yup.object().shape({
    code: yup
        .string()
        .test('check-phone-code', 'Поле обязательно для заполнения', x => {
            return /\d{6}/.test(x || '')
        })
        .required(),
})

type FormInputs = {
    code: string
}

function SmsForm({
    reset,
    phone,
    stopTimeInSeconds,
    resetTimeInSeconds
}: SmsFormProps) {
    const client = useClient()
    const { formatMessage } = useIntl()

    const {
        control,
        handleSubmit,
        getValues,
        formState: {
            errors,
            isValid,
            isSubmitting
        },
    } = useForm<FormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            code: undefined
        }
    })

    const {
        loginByCode,
    } = useAuth()

    const navigate = useNavigate()

    const [count, setCount] = React.useState({ count: stopTimeInSeconds, try: 0 })
    const [timerId, setTimerId] = React.useState<NodeJS.Timeout>()

    React.useEffect(() => {
        const tId = setTimeout(() => {
            reset()
        }, resetTimeInSeconds * 1000);
        setTimerId(tId)
    }, [])

    React.useEffect(() => {
        if (isValid) {
            onSubmit({ code: getValues('code') })
        }
    }, [isValid])

    const secondsToNextTry = useCountdown({
        tryCount: count.try,
        seconds: count.count,
    })

    const smsQuery = useMutation((phone: string) => {
        return client.sendAuthSMS(phone)
    }, {
        onSuccess: response => {
            notify({
                message: formatMessage({ id: "app.login.isCodeSend" }),
                type: 'success'
            })
            setCount(x => ({ count: response.data.retryInterval, try: x.try + 1 }))

            clearTimeout(timerId!)
            const tId = setTimeout(() => {
                reset()
            }, response.data.expiresIn * 1000);
            setTimerId(tId)
        },
        onError: (e: HttpErrorResponse) => {
            notify({
                message: e?.response?.data?.title || formatMessage({ id: "app.login.sendCodeFailed" }),
                type: 'error',
            })
        }
    })

    const loginQuery = useMutation((code: string) => {
        return loginByCode({
            authCode: code
        })
    }, {
        onSuccess: response => { },
        onError: async (e: Response) => {
            const body = await e.json()

            notify({
                message: body?.title || formatMessage({ id: "app.login.failed" }),
                type: 'error',
            })

            if (body?.reason?.toLowerCase() === 'attempts limited') {
                navigate(routesList.login)
            }
        }
    })

    const onSubmit = async (data: FormInputs) => {
        await loginQuery.mutateAsync(data.code)
    }

    return (
        <Frame>
            <H4
                style={{
                    textAlign: 'center',
                    marginBottom: 24
                }}
            >
                <FormattedMessage id='app.welcome.phoneCode.tip' />
            </H4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                    intent={'danger'}
                    disabled={false}
                    bottomHint={errors.code?.message}
                    style={{ marginBottom: 24 }}
                >
                    <Controller
                        name='code'
                        control={control}
                        render={({ field }) => {
                            return (
                                <InputMask
                                    {...field}
                                    style={{
                                        width: '100%',
                                        fontWeight: 600,
                                        textAlign: 'center'
                                    }}
                                    autoFocus
                                    mask={MASK.phoneCode}
                                    guide
                                    showMask
                                    intent={errors.code?.message ? 'danger' : 'none'}
                                />
                            )
                        }}
                    />
                </InputGroup>
            </form>

            <P
                style={{
                    textAlign: 'center',
                    marginBottom: 8,
                    fontSize: 13
                }}
            >
                <FormattedMessage
                    id='app.welcome.phoneCode.tip2'
                    values={{ phone, br: <br /> }}
                />
            </P>

            {secondsToNextTry === 0 && (
                <ButtonLink
                    disabled={smsQuery.isLoading}
                    onClick={() => {
                        smsQuery.mutate(phone)
                    }}
                >
                    <FormattedMessage id='app.login.sendCodeAgain' />
                </ButtonLink>
            )}

            {secondsToNextTry !== 0 && (
                <P
                    style={{
                        fontSize: 13
                    }}
                >
                    <FormattedMessage
                        id='app.login.tryAgainAfter'
                        values={{ time: secondsToNextTry }}
                    />
                </P>
            )}

            <ButtonMinimal
                onClick={() => {
                    reset()
                }}
            >
                <FormattedMessage
                    id='app.goBack'
                />
            </ButtonMinimal>
        </Frame>
    )
}

export {
    SmsForm
}