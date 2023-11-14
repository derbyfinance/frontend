import Notification from '@components/Notification'
import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import AllocateButton from './AllocateButton'
import AllocateSummaryRow from './AllocateSummaryRow'
import ConnectWalletButton from './ConnectWalletButton'
import { isConnectedState } from '@store/UserSlice'
interface Props {
	update: (index: number) => void
	remove: (index: number) => void
}

const AllocateSummary = ({ update, remove }: Props) => {
	const rewards = useDerbyTokenBalance()
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)

	useDidMountEffect(() => {
		const amount =
			allocationList?.reduce((prev, allocate) => {
				return prev + allocate?.amount
			}, 0) ?? 0

		if (allocationList && rewards - amount <= 0) {
			toast.info(
				<Notification
					title="Allocation"
					notification="Your total amount of Derby tokens has been allocated."
				/>
			)
		}
	}, [allocationList])

	return (
		<Container>
			<RowTable>
				<tbody>
					{allocationList?.map((allocation, index) => (
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

			{allocationList === undefined || allocationList?.length <= 0 ? (
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
export default AllocateSummary