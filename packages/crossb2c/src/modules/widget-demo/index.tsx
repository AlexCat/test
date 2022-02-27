import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { AiOutlineInfoCircle, AiOutlineHeart, AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { GrTrash, GrDeliver } from 'react-icons/gr'
import { default as NumberFormat } from 'react-number-format'
import { routesList } from 'routes/routes-list'

import kettlePic from 'assets/images/kettle.png'
import breadmakerPic from 'assets/images/breadmaker.png'
import { H1, H2, H3, H4, P } from 'kit/typography'
import { Error } from 'kit/error'
import { Spinner } from 'kit/spinner'
import { queryName } from 'api/query-name'
import { useClient } from 'context/auth-context'
import { FancyLink } from 'kit/fancy-link'
import { Card, CardContent } from 'kit/card'
import { Button } from 'kit/button'
import { Input } from 'kit/input'
import { Checkbox } from 'kit/checkbox'
import { Callout } from 'kit/callout'

import './widget'

const src = `!function(){"undefined"!=typeof window?null!==this?(window.sbl||(window.sbl={}),window.sbl.createWidget=function(n){return function(){var e=n?n.containerId:null,i=document.getElementById(e);if(null!==i){var t=document.createElement("a");return t.innerHTML="Передать данные в СберЛогистику",t.href="/itp/confirm-offer",t.target="_blank",t.classList.add("sbl-link"),n.disableStyles||(t.style.cssText="background-color:yellow"),i.appendChild(t),document.addEventListener("visibilitychange",n=>{"visible"==document.visibilityState?(console.log("tab is active"),t.innerHTML="переданы"):console.log("tab is inactive")}),{setPhoneNumber:function(n){},onSuccess:function(){},onError:function(){}}}console.error("Sbl: Не найден контейнер для ренедеринга ссылки")}()}):console.warn("Sbl: Объект this не определен"):console.warn("Sbl: Виджет Сберлогистики не поддерживает SSR")}();`

type Good = {
    id: number
    src: string
    title: string
    price: number
    weight: number
    quantity: number
    deliveryTime: string
}

function Currency({ value }: { value: number }) {
    return (
        <span style={{ fontWeight: 600 }}>
            <NumberFormat
                displayType={'text'}
                decimalSeparator=','
                thousandSeparator=' '
                value={value}
            />
            <span>{' ₽'}</span>
        </span>
    )
}

const goods: Good[] = [{
    id: 1,
    src: kettlePic,
    title: 'Чайник электрический Xiaomi Mi Smart Kettle Pro (BHR4198GL) (глобальная версия)',
    deliveryTime: 'Доставка: с 6 по 7 февраля',
    weight: 7.45,
    price: 3341,
    quantity: 2
},
{
    id: 2,
    src: breadmakerPic,
    title: 'Хлебопечка Moulinex Pain & Delices OW240E30',
    deliveryTime: 'Доставка: с 5 по 7 февраля',
    weight: 1.25,
    price: 9511,
    quantity: 1
}
]

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
        width: 'calc(100% - 48px)',
        maxWidth: 770,
        marginBottom: 24
    }
})

const Title = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        margin: '32px 0 0 0',

        [theme!.mq.small]: {
            margin: '36px 0 20px 0'
        }
    }
})

const OrderLine = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
    }
})

const Link = styled.a(({ theme }: {
    theme?: Theme
}) => {
    return {
    }
})

function WidgetDemoModule() {
    const theme = useTheme()
    const [checked, setChecked] = React.useState(false)

    const orderSum = goods.map(x => x.price * x.quantity).reduce((partialSum, a) => partialSum + a, 0)

    // React.useLayoutEffect(() => {

    //     const payload = (window as any).sbl.createWidget({
    //         containerId: 'test',
    //         disableStyles: false
    //     })


    // }, [])

    return (
        <React.Fragment>
            <Frame>
                <CenteredBlock>
                    <Title>
                        <H2
                            style={{
                                display: 'flex',
                                margin: 0
                            }}
                        >
                            <AiOutlineShoppingCart
                                style={{
                                    marginRight: 8
                                }}
                            />
                            <span>
                                Оформление заказа
                            </span>
                        </H2>
                    </Title>
                    <P
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Ваш регион:
                        <span
                            style={{
                                marginLeft: 4,
                                display: 'flex',
                                color: theme.colors.color7
                            }}
                        >
                            Москва и Московская область
                            <IoIosArrowDown />
                        </span>
                    </P>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: 10
                            }}
                        >
                            {goods.map(x => {
                                return (
                                    <Card
                                        key={x.id}
                                        style={{
                                            marginBottom: 10
                                        }}
                                    >
                                        <CardContent style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>

                                            {/* image */}
                                            <div
                                                style={{
                                                    width: 100,
                                                }}
                                            >

                                                <img
                                                    src={x.src}
                                                    alt={x.title}
                                                    width={90}
                                                    height={90}
                                                    style={{
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        display: 'block',
                                                    }}
                                                />
                                            </div>

                                            {/* title */}
                                            <div
                                                style={{
                                                    width: 270,
                                                    margin: '0 8px',
                                                }}
                                            >
                                                <P>{x.title}</P>
                                                <P
                                                    style={{
                                                        display: 'flex',
                                                        fontSize: 12,
                                                        color: theme.colors.color1
                                                    }}
                                                >
                                                    <GrDeliver
                                                        style={{
                                                            color: theme.colors.color1,
                                                            marginRight: 4
                                                        }}
                                                        size={14}
                                                    />
                                                    <span>
                                                        {x.deliveryTime}
                                                    </span>
                                                </P>
                                            </div>

                                            {/* quantity */}
                                            <div
                                                style={{
                                                    maxWidth: 50,
                                                    display: 'flex'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: 16,
                                                }}>
                                                    <AiOutlinePlus />
                                                    <div
                                                        style={{
                                                            margin: '2px 6px 0 6px'
                                                        }}
                                                    >
                                                        {x.quantity}
                                                    </div>
                                                    <AiOutlineMinus />
                                                </div>
                                            </div>

                                            {/* price */}
                                            <div
                                                style={{
                                                    maxWidth: 60,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    margin: '0 8px'
                                                }}
                                            >
                                                <Currency
                                                    value={x.price * x.quantity}
                                                />
                                            </div>

                                            {/* meta */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <AiOutlineHeart
                                                    size={20}
                                                />

                                                <GrTrash
                                                    style={{
                                                        marginTop: 'auto'
                                                    }}
                                                    size={18}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}

                            <Card>
                                <CardContent>
                                    <H3>Условия доставки <AiOutlineInfoCircle size={16} /></H3>
                                    <OrderLine>
                                        <P>Передать данные для таможенного оформления через компанию СберЛогистика</P>
                                        <Button
                                            style={{
                                                width: '100%',
                                                fontSize: 12,
                                                height: 48
                                            }}
                                            onClick={() => {
                                                window.open(routesList.sendUserInfo)
                                            }}
                                        >
                                            Передать данные
                                        </Button>

                                        {/* <P id='test' /> */}
                                    </OrderLine>
                                </CardContent>
                            </Card>

                            <Card
                                style={{
                                    marginTop: 10
                                }}
                            >
                                <CardContent>
                                    <H3>Адрес доставки <AiOutlineInfoCircle size={16} /></H3>
                                    <Input
                                        placeholder='Город, улица, номер дома*'
                                        style={{
                                            width: '100%',
                                            marginBottom: 10
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '10px',
                                            marginBottom: 10
                                        }}
                                    >
                                        <Input
                                            placeholder='Кв./офис*'
                                            style={{
                                                width: 120,
                                            }}
                                        />
                                        <Input
                                            placeholder='Этаж'
                                            style={{
                                                width: 120,
                                            }}
                                        />
                                        <Input
                                            placeholder='Подъезд'
                                            style={{
                                                width: 120,
                                            }}
                                        />
                                        <Input
                                            placeholder='Домофон'
                                            style={{
                                                width: 150,
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Checkbox
                                            checked={checked}
                                            onChange={e => {
                                                setChecked(!checked)
                                            }}
                                            style={{ marginRight: 12 }}
                                        />
                                        <P style={{ margin: 0 }}>Сохранить адрес</P>
                                    </div>

                                </CardContent>
                            </Card>

                            <Button
                                style={{
                                    width: '100%',
                                    marginTop: 20,
                                    marginBottom: 24
                                }}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                        <Card
                            style={{
                                height: 250
                            }}
                        >
                            <CardContent
                                style={{
                                    width: 280,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxSizing: 'border-box',
                                    height: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <H3>Ваш заказ</H3>
                                <OrderLine>
                                    <P>Товары ({goods.length})</P>
                                    <P>
                                        <Currency value={orderSum} />
                                    </P>
                                </OrderLine>
                                <OrderLine>
                                    <P>Бонусы</P>
                                    <P>
                                        <Currency value={0} />
                                    </P>
                                </OrderLine>
                                <OrderLine>
                                    <P>Доставка</P>
                                    <P>Курьером</P>
                                </OrderLine>
                                <OrderLine
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <P>Сумма заказа</P>
                                    <H4 style={{ margin: 0 }}>
                                        <Currency value={orderSum} />
                                    </H4>
                                </OrderLine>
                            </CardContent>
                        </Card>
                    </div>

                    {/* <Callout
                        intent='primary'
                        size='small'
                        style={{
                        }}
                    >
                        {src}
                    </Callout> */}
                </CenteredBlock>
            </Frame>

        </React.Fragment >
    )
}

export {
    WidgetDemoModule
}