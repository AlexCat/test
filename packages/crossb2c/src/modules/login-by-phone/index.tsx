import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Checkbox } from 'kit/checkbox'
import { InputMask, MASK } from 'kit/input-mask'
import { InputGroup } from 'kit/input-group'
import { Card } from 'kit/card'
import { Button } from 'kit/button'
import { H4, P } from 'kit/typography'
import { Link } from 'kit/typography'
import { ButtonMinimal } from 'kit/button-minimal'
import { routesList } from 'routes/routes-list'

import { useModule } from './use-module'
import { SmsForm } from './dependencies/sms-form'

type LoginByPhoneProps = {

}

const Frame = styled.div(({ theme }) => {
    return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const Form = styled.form(({ theme }) => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
})

function LoginByPhone({
}: LoginByPhoneProps) {
    const {
        formProps: {
            getValues,
            control,
            handleSubmit,
            formState: {
                errors,
                isValid,
                isSubmitting
            },
        },
        smsQuery,
        onSubmit,
    } = useModule()

    const [isAgreementAccept, setIsAgreementAccept] = React.useState(false)
    const navigate = useNavigate()

    return (
        <Frame>
            <Card style={{
                width: 250,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: 24,
                marginBottom: 12,
                marginTop: 12
            }}>
                {!smsQuery.isSuccess && (
                    <React.Fragment>
                        <H4
                            style={{
                                textAlign: 'center',
                                marginBottom: 8
                            }}
                        >
                            <FormattedMessage id='app.welcome' />
                        </H4>
                        <P
                            style={{
                                textAlign: 'center',
                                marginBottom: 24,
                            }}
                        >
                            <FormattedMessage id='app.welcome.phone.tip' />
                        </P>
                    </React.Fragment>
                )}
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: smsQuery.isSuccess ? 'none' : 'flex'
                    }}
                >
                    <InputGroup
                        intent={'danger'}
                        disabled={false}
                        bottomHint={errors.phone?.message}
                        style={{ marginBottom: 24 }}
                    >
                        <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <InputMask
                                        {...field}
                                        style={{
                                            width: '100%',
                                            fontWeight: 600,
                                        }}
                                        mask={MASK.phone}
                                        guide
                                        placeholder='+7 (XXX) XXX-XX-XX'
                                        intent={errors.phone?.message ? 'danger' : 'none'}
                                    />
                                )
                            }}
                        />
                    </InputGroup>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: 24,
                        fontSize: 13,
                        lineHeight: '150%'
                    }}>
                        <Checkbox
                            checked={isAgreementAccept}
                            onChange={e => {
                                setIsAgreementAccept(!isAgreementAccept)
                            }}
                            style={{ marginRight: 12 }}
                        />
                        <span>
                            <FormattedMessage
                                id='app.docs.sendData'
                                values={{
                                    link1: (chunks: any) => (<Link intent="success" target='_blank' href="/documents/oferta.pdf">{chunks}</Link>)
                                }}
                            />
                        </span>
                    </div>
                    <Button
                        type='submit'
                        style={{ width: '100%' }}
                        loading={isSubmitting}
                        disabled={!isAgreementAccept || !isValid}
                    >
                        <FormattedMessage id='app.process' />
                    </Button>

                    <ButtonMinimal
                        type='button'
                        style={{
                            marginTop: 12,
                            alignItems: 'center'
                        }}
                        onClick={() => {
                            navigate(routesList.root)
                        }}
                    >
                        <FormattedMessage
                            id='app.goBack'
                        />
                    </ButtonMinimal>
                </Form>

                {smsQuery.isSuccess && (
                    <SmsForm
                        stopTimeInSeconds={smsQuery.data.data.retryInterval}
                        resetTimeInSeconds={smsQuery.data.data.expiresIn}
                        phone={getValues('phone')!}
                        reset={smsQuery.reset}
                    />
                )}

            </Card>
        </Frame>
    )
}

export {
    LoginByPhone
}