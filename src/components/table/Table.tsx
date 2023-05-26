import { styled } from 'styled-components'

import TableHeaderModel from '@models/internal/TableHeaderModel'

import TableData from './TableData'

interface Props {
	headers: TableHeaderModel[]
	footer?: JSX.Element | JSX.Element[] | React.ReactNode
	children: JSX.Element | JSX.Element[] | React.ReactNode
}

export default ({ headers, footer, children }: Props) => {
	const colSpan: number = headers.reduce((prev, { colspan }) => {
		return prev + (!colspan ? 1 : colspan)
	}, 0)

	return (
		<Table>
			<thead>
				<tr>
					{headers.map(({ name, align, colspan }, index) => (
						<Th align={align} colSpan={colspan ?? 1} key={index}>
							{name}
						</Th>
					))}
				</tr>
			</thead>
			<tbody>{children}</tbody>
			{footer && (
				<tfoot>
					<tr>
						<TableData colSpan={colSpan}>{footer}</TableData>
					</tr>
				</tfoot>
			)}
		</Table>
	)
}

const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	margin-top: 2em;
`
const Th = styled.th<{ align?: 'left' | 'center' | 'right' }>`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	color: ${({ theme }) => theme.style.colorLabel};
	font-weight: normal;
	text-transform: uppercase;
	font-size: 1em;
	line-height: 1em;
	padding: 0 0.5em;
	text-align: ${({ align }) => align ?? 'left'};
`
