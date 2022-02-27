import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { NavLink as NavLinkReact, NavLinkProps } from 'react-router-dom'

type Props = {
	type?: 'desktop-menu' | 'mobile-menu' | 'in-text'
}

const DesktopLi = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		fontSize: 18,
		margin: '0 16px',
		lineHeight: '24px',
		color: theme!.colors.color5,
		display: 'flex',
		alignItems: 'center',

		'>a': {
			textDecoration: 'none',
			color: 'inherit',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			borderBottomStyle: 'solid',
			borderBottomColor: theme!.colors.color3
		}
	}
})

const mobileLi = {
	textDecoration: 'none'
}

function getStyles(type: Props['type'], theme: Theme): React.CSSProperties {
	switch (type) {
		case 'desktop-menu':
			return {
				textDecoration: 'none',
				color: 'inherit',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				borderBottomStyle: 'solid',
				borderBottomColor: theme!.colors.color3
			}
		case 'mobile-menu':
			return {
				textDecoration: 'none'
			}
		case 'in-text':
			return {}

		default:
			return {}
	}
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps & Props>((props: NavLinkProps & Props, ref) => {
	const {
		type = 'in-text',
		style: styleProp
	} = props

	const theme = useTheme()


	return (
		<NavLinkReact
			ref={ref}
			{...props}
			style={({ isActive }) => ({
				...getStyles(type, theme),
				...typeof styleProp === "function" ? styleProp({ isActive }) : styleProp
			})}
		/>
	)
})

export {
	NavLink
}