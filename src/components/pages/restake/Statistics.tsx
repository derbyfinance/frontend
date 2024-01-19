import * as NewTable from '@components/table/Table'
import TableData from '@components/table/TableData'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import { styled } from 'styled-components'

const Statistics = () => {
	const headers: TableHeaderModel[] = [
		{ name: 'Total Value Locked', align: 'left' },
		{ name: 'APR', align: 'right' },
		{ name: 'Restaking Points', align: 'right' },
		{ name: 'Derby Points', align: 'right' }
	]

	const list: string[] = [
		'50,000 ETH / $ 12,001,200',
		'3.7%',
		'10,123,456,789',
		'5,123,456'
	]

	return (
		<Container>
			<XTable headers={headers} isSmall>
				<tr>
					{list.map((item, index) => (
						<TableData key={index} $align={index === 0 ? 'left' : 'right'}>
							{item}
						</TableData>
					))}
				</tr>
			</XTable>
		</Container>
	)
}

const Container = styled.div``

const XTable = styled(NewTable.default)`
	& td:not(:last-child),
	& th:not(:last-child) {
		border-right: 1px solid ${({ theme }) => theme.style.colorBorder};
	}
`
export default Statistics
