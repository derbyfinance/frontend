import ActionButton from '@components/buttons/ActionButton'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'
import { getAllocationState } from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import AllocateSummaryRow from './AllocateSummaryRow'

interface Props {
	update: (index: number) => void
	remove: (index: number) => void
}

export default ({ update, remove }: Props) => {
	const allocationList = useSelector<AppState, AllocationRequestModel[]>(
		getAllocationState
	)

	return (
		<Container>
			<RowTable>
				<tbody>
					{allocationList.map((allocation, index) => (
						<AllocateSummaryRow
							allocate={allocation}
							key={index}
							index={index}
							remove={remove}
							update={update}
						/>
					))}
				</tbody>
			</RowTable>

			{allocationList.length <= 0 ? (
				<Empty>
					<p>Nothing selected</p>
				</Empty>
			) : null}

			<ActionButton $isCta $align="right" disabled={allocationList.length <= 0}>
				<div>
					{`Buy now `}
					{ToCoinCurrency(
						allocationList?.reduce((prev, allocate) => {
							return prev + allocate?.amount
						}, 0),
						0
					)}
					{` `}
					<Small>DRB</Small>
				</div>
			</ActionButton>
		</Container>
	)
}

const Container = styled.div``

const Empty = styled.div`
	text-align: center;
`
const Small = styled.span`
	font-size: 0.75em;
`
const RowTable = styled.table`
	border-collapse: separate;
	border-spacing: 0 1em;
	width: 100%;
`
