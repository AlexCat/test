import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link as reactRouterLink } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

import { ReactComponent as DesktopLogo } from 'assets/images/desktop_logo.svg'
import { ReactComponent as MobileLogo } from 'assets/images/mobile_logo.svg'
import { ReactComponent as LogoutIcon } from 'assets/images/logout.svg'
import { ReactComponent as BurgerMenuIcon } from 'assets/images/berger-menu.svg'
import { ReactComponent as CloseIcon } from 'assets/images/close.svg'
import { useMedia } from 'context/media-provider'
import { useAuth } from 'context/auth-context'
import { ButtonMinimal } from 'kit/button-minimal'
import { Link } from 'kit/typography'
import { NavLink } from 'kit/nav-link'

type HeaderProps = {
}

const LogoLink = styled(reactRouterLink)(({ theme }: {
    theme?: Theme
}) => {
    return {
        textDecoration: 'none',
        margin: 0,
        padding: 0,
        ':hover': {
            cursor: 'pointer'
        }
    }
})

const Frame = styled.header(({ theme }: {
    theme?: Theme
}) => {
    return {
        height: 58,
        display: 'flex',
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        background: theme!.colors.color4,
        borderBottom: `1px solid ${theme!.colors.color2}`,

        [theme!.mq.small]: {
            height: 64,
        }
    }
})

const Alignment = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 1168,
        padding: '0 24px'
    }
})

const Info = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        color: theme!.colors.color1,
        fontSize: 10,
        lineHeight: '14px'
    }
})

const Ul = styled.ul(({ theme }: {
    theme?: Theme
}) => {
    return {
        margin: 12,
        marginTop: 24
    }
})

const Li = styled.li(({ theme }: {
    theme?: Theme
}) => {
    return {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 18,
        lineHeight: '150%',
        color: theme!.colors.color5
    }
})

const DesktopLi = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        fontSize: 18,
        margin: '0 16px',
        lineHeight: '24px',
        color: theme!.colors.color5,
        display: 'flex',
        alignItems: 'center'
    }
})

const Contacts = styled.div(({ theme }: {
    theme?: Theme
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        color: theme!.colors.color5,
        fontSize: 12,
        lineHeight: '16px',
        paddingTop: 12,
        margin: 12,
        marginTop: 48,
        borderTop: `1px solid ${theme!.colors.color2}`

    }
})

const bodyRef = document.getElementsByTagName('body')[0]

function Header() {
    const { user, logout } = useAuth()
    const { isMobile } = useMedia()
    const { colors } = useTheme()
    const [isOpenMenu, setIsOpenMenu] = React.useState(false)

    React.useEffect(() => {
        if (!isMobile) {
            setIsOpenMenu(false)
        }
    }, [isMobile])

    React.useEffect(() => {
        bodyRef.style.overflow = isOpenMenu ? 'hidden' : 'unset'
    }, [isOpenMenu])

    return (
        <Frame>
            <Alignment>
                <LogoLink to="/orders">
                    {isMobile ? <MobileLogo /> : <DesktopLogo />}
                </LogoLink>
                {!user && (
                    <Info>
                        <Link style={{
                            fontSize: isMobile ? 13 : 17,
                            fontWeight: 600,
                            lineHeight: '150%',
                            textDecoration: 'none',
                            color: colors.color5,
                            margin: 0
                        }} href="tel:88001007269">8 800 100 72 69</Link>
                        <span><FormattedMessage id='app.callFree' /></span>
                    </Info>
                )}
                {user && (
                    <React.Fragment>
                        {isMobile && (
                            <Menu
                                right
                                noOverlay
                                disableOverlayClick={true}
                                width='100%'
                                isOpen={isOpenMenu}
                                onStateChange={(state) => {
                                    setIsOpenMenu(state.isOpen)
                                }}
                                customBurgerIcon={<BurgerMenuIcon />}
                                customCrossIcon={<CloseIcon />}
                            >
                                <MobileLogo style={{ position: 'absolute', top: 20, left: 37, outline: 'none' }} />
                                <Ul>
                                    <Li>
                                        <NavLink
                                            to="/orders"
                                            type='mobile-menu'
                                            style={({ isActive }) => ({
                                                color: isActive ? colors.color3 : 'inherit',
                                                fontWeight: isActive ? 600 : 'inherit'
                                            })}
                                            onClick={() => setIsOpenMenu(false)}
                                        >
                                            <FormattedMessage id='app.menu.shipments' />
                                        </NavLink>
                                    </Li>
                                    <Li>
                                        <NavLink
                                            to="/profile"
                                            type='mobile-menu'
                                            style={({ isActive }) => ({
                                                color: isActive ? colors.color3 : 'inherit',
                                                fontWeight: isActive ? 600 : 'inherit'
                                            })}
                                            onClick={() => setIsOpenMenu(false)}
                                        >
                                            <FormattedMessage id='app.menu.profile' />
                                        </NavLink>
                                    </Li>
                                    <Li>
                                        <button
                                            style={{
                                                padding: 0,
                                                border: 'none',
                                                font: 'inherit',
                                                color: 'inherit',
                                                backgroundColor: 'transparent'
                                            }}
                                            onClick={() => logout()}
                                        >
                                            <FormattedMessage id='app.menu.logout' />
                                        </button>
                                    </Li>
                                </Ul>
                                <div>
                                    <Contacts>
                                        <Link style={{ fontSize: 24, textDecoration: 'none' }} href="tel:88001007269">8 800 100 72 69</Link>
                                        <span style={{ color: colors.color1 }}>звонок бесплатный  по РФ</span>
                                        <Link style={{ fontSize: 24, textDecoration: 'none', color: colors.color3 }} href="mailto:help@sblogistica.ru">help@sblogistica.ru</Link>
                                    </Contacts>
                                </div>
                            </Menu>
                        )}

                        {!isMobile && (
                            <React.Fragment>
                                <div style={{
                                    display: 'flex',
                                    height: 64,
                                }}>
                                    <DesktopLi>
                                        <NavLink
                                            to="/orders"
                                            type='desktop-menu'
                                            style={({ isActive }) => ({
                                                fontWeight: isActive ? 600 : 'inherit',
                                                borderBottomWidth: isActive ? 1 : 0
                                            })}
                                            onClick={() => setIsOpenMenu(false)}
                                        >
                                            <FormattedMessage id='app.menu.shipments' />
                                        </NavLink>
                                    </DesktopLi>
                                    <DesktopLi>
                                        <NavLink
                                            to="/profile"
                                            type='desktop-menu'
                                            style={({ isActive }) => ({
                                                fontWeight: isActive ? 600 : 'inherit',
                                                borderBottomWidth: isActive ? 1 : 0
                                            })}
                                            onClick={() => setIsOpenMenu(false)}
                                        >
                                            <FormattedMessage id='app.menu.profile' />
                                        </NavLink>
                                    </DesktopLi>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        width: 230
                                    }}
                                >
                                    <ButtonMinimal
                                        icon={<LogoutIcon style={{ width: 20, height: 20, marginRight: 4 }} />}
                                        onClick={() => logout()}
                                    >
                                        <FormattedMessage id='app.logout' />
                                    </ButtonMinimal>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </Alignment>
        </Frame >
    )
}

export {
    Header
}