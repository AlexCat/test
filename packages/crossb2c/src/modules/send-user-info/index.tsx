import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { SberIdButton } from 'kit/sber-id-button'
import { createSberSendUserInfoRedirectUrl } from 'kit/sber-id-button/helpers'
import { Checkbox } from 'kit/checkbox'
import { Link } from 'kit/typography'

const Frame = styled.div(({ theme }) => {
    return {
        width: '100%',
        minHeight: '5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: 24,
        marginBottom: 24
    }
})

function SendUserInfo() {
    const [isAgreementAccept, setIsAgreementAccept] = React.useState(false)

    return (
        <Frame>
            <div
                style={{
                    height: 48,
                    marginBottom: 24
                }}
            >
                <SberIdButton
                    redirectUri={createSberSendUserInfoRedirectUrl()}
                    disabled={!isAgreementAccept}
                />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                maxWidth: 206,
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
        </Frame>
    )
}

export {
    SendUserInfo
}