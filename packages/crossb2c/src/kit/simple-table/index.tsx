import { jsx, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

// import { Header } from './dependencies/header'
// import { Footer } from './dependencies/footer'

type SimpleTableProps = {
	children?: React.ReactNode
}

const Frame = styled.div(({ theme }: {
	theme?: Theme
}) => {
	return {
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
	}
})

const Table = styled.table(({ theme }: {
	theme?: Theme
}) => {
	return {
		width: '100%',
		border: `1px solid ${theme?.fns.shadeColor(theme?.colors.color2, -20)}`,
		borderCollapse: 'collapse'
	}
})

const TableHeader = styled.thead(({ theme }: {
	theme?: Theme
}) => {
	return {
		background: `${theme?.fns.shadeColor(theme?.colors.color2, -2)}`,
		fontWeight: 'bold'
	}
})

const TableBody = styled.tbody(({ theme }: {
	theme?: Theme
}) => {
	return {
		'tr:hover': {
			backgroundColor: `${theme?.fns.shadeColor(theme?.colors.color1, 120)}`,
		}
	}
})

const TableRow = styled.tr(({ theme }: {
	theme?: Theme
}) => {
	return {
	}
})

const TableHeaderCell = styled.th(({ theme }: {
	theme?: Theme
}) => {
	return {
		border: `1px solid ${theme?.fns.shadeColor(theme?.colors.color2, -20)}`,
		padding: 8
	}
})

const TableCell = styled.td(({ theme }: {
	theme?: Theme
}) => {
	return {
		border: `1px solid ${theme?.fns.shadeColor(theme?.colors.color2, -20)}`,
		padding: 8,
		textAlign: 'center'
	}
})

function SimpleTable({
	children
}: SimpleTableProps) {

	return (
		<Frame>

		</Frame>
	)
}

export {
	SimpleTable,

	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHeaderCell,
	TableCell
}