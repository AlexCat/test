import { Theme } from '@emotion/react'
import styled from '@emotion/styled'

import { Link } from 'kit/typography'

type FooterProps = {
}

const Frame = styled.footer(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 0,
		backgroundColor: theme?.colors.color5,
		color: theme?.colors.color4
	}
})

const Container = styled.div(({ theme, topBorder }: {
	theme?: Theme,
	topBorder?: boolean
}) => {
	return {
		display: 'flex',
		justifyContent: 'center',
		padding: '0 20px',
		borderTop: topBorder ? `1px solid ${theme!.colors.color1}` : 'none'
	}
})

const Info = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxWidth: 1168,

		[theme!.mq.small]: {
			flexDirection: 'row-reverse',
			justifyContent: 'space-between',
		}
	}
})

const Contacts = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		color: theme!.colors.color1,
		fontSize: 12,
		lineHeight: '16px',
		paddingTop: 40,
		'>a': {
			fontSize: 24,
			lineHeight: '32px',
			color: '#fff',
			textDecoration: 'none',
			margin: 0
		},

		[theme!.mq.small]: {
			padding: '32px 0',
			'>span': {
				marginBottom: 16
			},
		}
	}
})

const ContactsRec = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		color: theme!.colors.color1,
		lineHeight: '24px',
		padding: '32px 0',

		[theme!.mq.small]: {
			padding: '40px 0'
		}
	}
})

const Agreements = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxWidth: 1168,
		paddingBottom: 24,
		paddingTop: 24,
		'>a': {
			color: theme!.colors.color1,
			fontSize: 14,
			lineHeight: '20px'
		},

		[theme!.mq.small]: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			'>a': {
				marginLeft: 32,
			},
			'>a:first-of-type': {
				marginLeft: 0,
				marginRight: 'auto'
			},
		}
	}
})

function Footer() {

	return (
		<Frame>
			<Container>
				<Info>
					<Contacts>
						<Link href="tel:88001007269">8 800 100 72 69</Link>
						<span>звонок бесплатный  по РФ</span>
						<Link href="mailto:help@sblogistica.ru">help@sblogistica.ru</Link>
					</Contacts>
					<ContactsRec>
						<span style={{ color: '#fff', paddingBottom: 20 }}>Услуги оказывает ООО «СберЛогистика»</span>
						<span>119334, Москва г, Вавилова ул, дом 24, корпус 1, помещение XXIX/3</span>
						<span>ОГРН: 1197746348458</span>
						<span>ИНН: 7736322345</span>
						<span>КПП: 773601001</span>
					</ContactsRec>
				</Info>
			</Container>
			<Container topBorder={true}>
				<Agreements>
					<Link target='_blank' href="/documents/oferta.pdf">Ознакомиться с публичной офертой</Link>
				</Agreements>
			</Container>
		</Frame>
	)
}

export {
	Footer
}