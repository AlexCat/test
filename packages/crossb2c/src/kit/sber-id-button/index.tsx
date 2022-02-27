import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { SberidSDK } from 'sber-id-sdk'
import { FormattedMessage } from 'react-intl'

import { useClient } from 'context/auth-context'
import { useQuery } from 'react-query'
import { preAuth } from 'context/auth-context/auth-endpoints'

import { GetPreAuthInfo_ServerResponse } from 'api/typings/get-pre-auth-info'
import { Error } from 'kit/error'
import { Spinner } from 'kit/spinner'

const btnContainer = 'sber-btn-container'

type SberIdButton = {
    disabled?: boolean
    redirectUri: string
    style?: React.CSSProperties
}

function createParams(data: GetPreAuthInfo_ServerResponse, redirectUrl: SberIdButton['redirectUri']) {
    const oidcParams = {
        response_type: data.responseType,
        client_type: data.clientType,
        client_id: data.clientId,
        redirect_uri: redirectUrl,
        scope: data.scope,
        nonce: data.nonce,
        state: data.state
    };

    const style = {
        theme: 'default',
        text: 'default',
        size: 'default',
        type: 'default',
        custom: {
            borderRadius: 22
        }
    }

    const sa = {
        enable: true,
        init: 'auto',
        clientId: data.clientId,
        clientName: 'ООО Ромашка'
    };

    return {
        oidc: oidcParams,
        container: btnContainer,
        display: 'page',
        mweb2app: false,
        generateState: true, // включить генерацию и проверку state, true по дефолту !!!
        style: style,
        sa: null, // параметры для отправки в SberVisor, sa по дефолту
        //baseUrl: 'https://ift-csa-sowa.testonline.sberbank.ru:4456',
        personalization: true,
        notification: {
            enable: false,
            onNotificationBannerClose: () => {
                console.log('Баннер закрыт');
            },
            onNotificationBannerOpen: () => {
                console.log('Баннер открыт');
            },
            animation: true,
            position: 'right',
        },
        fastLogin: {
            enable: false,
            timeout: 1000,
            mode: 'default',
        },
    }

}

function SberIdButton({
    disabled,
    redirectUri,
    style
}: SberIdButton) {
    const [_, setSbSDK] = React.useState<any | null>(null)

    const preAuthQuery = useQuery(['preAuthQuery'], async () => {
        return preAuth()
    }, {
        cacheTime: 0,
        onSuccess: data => {
            function onSuccessCallback() { }
            function onErrorCallback() { }

            const sbSDK = new SberidSDK(createParams(data, redirectUri), onSuccessCallback, onErrorCallback);

            setSbSDK(sbSDK)
        }
    })

    return (
        <React.Fragment>
            <div
                className={btnContainer}
                style={{
                    ...style,
                    pointerEvents: disabled ? 'none' : 'all',
                    opacity: disabled ? 0.5 : 1,
                    transition: '.2s all',
                }}
                
            />
            {preAuthQuery.status === 'loading' && (
                <Spinner size={37} fill />
            )}
            {preAuthQuery.status === 'error' && (
                <Error fill>
                    <FormattedMessage id='app.networkError' />
                </Error>
            )}
        </React.Fragment>
    )
}

export {
    SberIdButton
}