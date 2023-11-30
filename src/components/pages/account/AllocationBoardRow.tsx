import StockCurrency from '@components/StockCurrency'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { styled } from 'styled-components'

interface Props {
	allocation: AllocationRequestModel
}

const AllocationBoardRow = ({ allocation }: Props) => {
	return (
		<TableRow>
			<TableData $align="left">{allocation.vault}</TableData>
			<TableData $align="left">{allocation.protocol}</TableData>
			<TableData $align="right">{allocation.maxAmount}%</TableData>
			<TableData $align="right">
				<StockCurrency $amount={allocation.amount} $isAbbr $coin="USDC" />
			</TableData>
		</TableRow>
	)
}

const Container = styled.div``

export default AllocationBoardRow
