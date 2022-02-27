import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { default as NumberFormat } from 'react-number-format'

import { Good } from 'api/typings/get-shipments'
import { Error } from 'kit/error'

const Mapper = {
    centToCurrency(value: number | undefined | null) {
        return value
            ? <NumberFormat
                displayType={'text'}
                decimalSeparator=','
                thousandSeparator=' '
                value={value / 100}
            />
            : '—'
    }
}

const Frame = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        mixBlendMode: 'normal',
        border: '0.5px solid rgba(8, 8, 8, 0.1)',
        boxSizing: 'border-box',
        borderRadius: 8,
        padding: 16,
        fontSize: 13,
        lineHeight: '150%',

        marginTop: 24
    }
})

const Thead = styled.thead(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontWeight: 600,
        'tr': {
            'th': {
                textAlign: 'left',
                paddingBottom: 8
            },
            'th:last-of-type': {
                textAlign: 'right'
            }
        }
    }
})

const Tbody = styled.tbody(({ theme }: {
    theme?: Theme
}) => {
    return {
        'tr:not(:last-of-type)': {
            'td': {
                paddingBottom: 16
            }
        },
        'td:last-of-type': {
            textAlign: 'right'
        }
    }
})

function Goods({ goods }: {
    goods: Good[] | null
}) {

    if (!goods || goods.length === 0) {
        return (
            <Frame>
                <Error fill>
                    <FormattedMessage id='app.shipments.goods.noShipmentsGoods' />
                </Error>
            </Frame>
        )
    }

    return (
        <Frame>
            <table style={{ width: '100%' }}>
                <Thead>
                    <tr>
                        <th>
                            <FormattedMessage id='app.shipments.goods.goodsList' />
                        </th>
                        <th>
                            <FormattedMessage id='app.shipments.goods.price' />
                        </th>
                    </tr>
                </Thead>
                <Tbody>
                    {goods.map((x, i) => (
                        <tr key={i}>
                            <td>{x.name}</td>
                            <td>{Mapper.centToCurrency(x.price)} {x.priceCurrency}</td>
                        </tr>
                    ))}
                </Tbody>
            </table>
        </Frame>
    )
}

export {
    Goods
}