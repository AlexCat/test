import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

import { Header } from './dependencies/header'
import { Footer } from './dependencies/footer'

type LayoutProps = {
	children: React.ReactNode
}

const Frame = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
		minHeight: '100vh',
		overflowY: 'auto'
	}
})

const Body = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flexGrow: 1,
		background: theme!.colors.color8
	}
})

function AppLayout({
	children
}: LayoutProps) {

	return (
		<Frame>
			<Header />
			<Body>
				{children}
			</Body>
			<Footer />
		</Frame>
	)
}

export {
	AppLayout
}