import ActionButton from '@components/buttons/ActionButton'
import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'
import { styled } from 'styled-components'
import AllocateSummaryRow from './AllocateSummaryRow'

interface Props {
	allocateList: AllocationRequestModel[]
	update: (index: number) => void
	remove: (index: number) => void
}

export default ({ allocateList, update, remove }: Props) => {
	return (
		<Container>
			<RowTable>
				<tbody>
					{allocateList.map((allocate, index) => (
						<AllocateSummaryRow
							allocate={allocate}
							key={index}
							index={index}
							remove={remove}
							update={update}
						/>
					))}
				</tbody>
			</RowTable>

			{allocateList.length <= 0 ? (
				<Empty>
					<p>Nothing selected</p>
				</Empty>
			) : null}

			<ActionButton $isCta $align="right" disabled={allocateList.length <= 0}>
				<div>
					{`Buy now 
				${allocateList
					?.reduce((prev, allocate) => {
						return prev + allocate?.amount
					}, 0)
					.toLocaleString()}
`}
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
