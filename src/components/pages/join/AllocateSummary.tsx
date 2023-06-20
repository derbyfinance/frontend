import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'
import AllocateButton from './AllocateButton'
import AllocateSummaryRow from './AllocateSummaryRow'
import ConnectWalletButton from './ConnectWalletButton'

interface Props {
	update: (index: number) => void
	remove: (index: number) => void
}

export default ({ update, remove }: Props) => {
	const { isConnected } = useAccount()

	const allocationList = useSelector<AppState, AllocationRequestModel[]>(
		getAllocationListState
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
					<h4>Nothing selected</h4>
				</Empty>
			) : null}

			{isConnected ? <AllocateButton /> : <ConnectWalletButton />}
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
