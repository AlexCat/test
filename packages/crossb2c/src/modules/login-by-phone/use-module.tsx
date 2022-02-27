import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'

import { useClient } from 'context/auth-context'
import { notify } from 'kit/notify'

type FormInputs = {
    phone?: string
}

const schema = yup.object().shape({
    phone: yup
        .string()
        .test('check-phone-mask', 'Поле обязательно для заполнения', x => {
            return /^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(x || '')
        })
        .required(),
})

function useModule() {
    const { formatMessage } = useIntl()

    const client = useClient()

    const formProps = useForm<FormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            phone: undefined
        }
    })

    const smsQuery = useMutation((phone: string) => {
        return client.sendAuthSMS(phone)
    }, {
        onSuccess: response => {
            notify({
                message: formatMessage({ id: "app.login.isCodeSend" }),
                type: 'success',
            })
        },
        onError: (e: HttpErrorResponse) => {
            notify({
                message: e?.response?.data?.title || formatMessage({ id: "app.login.sendCodeFailed" }),
                type: 'error',
            })
        }
    })

    const onSubmit = async (data: FormInputs) => {
        await smsQuery.mutateAsync(data.phone!)
    }

    return {
        formProps,

        onSubmit,
        smsQuery,
    }
}

export {
    useModule
}