import { styled } from 'styled-components'

import TableHeaderModel from '@models/internal/TableHeaderModel'

import { AlignType } from '@datatypes/AlignType'
import TableData from './TableData'

interface Props {
	headers?: TableHeaderModel[]
	$isSticky?: boolean
	$isSmall?: boolean
	footer?: JSX.Element | JSX.Element[] | React.ReactNode
	children: JSX.Element | JSX.Element[] | React.ReactNode
}

const Table = ({
	headers = [],
	footer,
	children,
	$isSmall = false,
	$isSticky = false
}: Props) => {
	const colSpan: number = headers.reduce((prev, { colspan }) => {
		return prev + (!colspan ? 1 : colspan)
	}, 0)

	return (
		<TableComponent $isSmall={$isSmall}>
			{headers.length > 0 ? (
				<Thead $isSticky={$isSticky}>
					<tr>
						{headers.map(({ name, align, colspan }, index) => (
							<Th $align={align} colSpan={colspan ?? 1} key={index}>
								{name}
							</Th>
						))}
					</tr>
				</Thead>
			) : null}
			<tbody>{children}</tbody>
			{footer && (
				<tfoot>
					<tr>
						<TableData colSpan={colSpan}>{footer}</TableData>
					</tr>
				</tfoot>
			)}
			{$isSticky ? (
				<FooterShadow>
					<tr>
						<td colSpan={colSpan} />
					</tr>
				</FooterShadow>
			) : null}
		</TableComponent>
	)
}

const TableComponent = styled.table<{ $isSmall: boolean }>`
	border-collapse: collapse;
	width: 100%;
	margin-top: ${({ $isSmall }) => ($isSmall ? '0' : '2em')};
	position: relative;

	// FIX: Height: 100% for labels inside td
	height: 1px;
`
const Thead = styled.thead<{ $isSticky: boolean }>`
	background-color: ${({ theme }) => theme.style.colorBg};

	${({ $isSticky }) =>
		$isSticky &&
		`
		position: sticky;
		top: -1px;
		z-index: 1;
		box-shadow: 0px 7px 5px rgba(255, 255, 255, 0.85);
	`}
`

const Th = styled.th<{ $align?: AlignType }>`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	color: ${({ theme }) => theme.style.colorLabel};
	font-weight: normal;
	text-transform: uppercase;
	font-size: 1em;
	line-height: 1em;
	padding: 0 0.5em;
	text-align: ${({ $align }) => $align ?? 'left'};
`
const FooterShadow = styled.tfoot`
	position: sticky;
	bottom: -1em;
	height: 1em;
	box-shadow: 0px -7px 5px rgba(255, 255, 255, 0.85);
	z-index: 1;
`
export default Table