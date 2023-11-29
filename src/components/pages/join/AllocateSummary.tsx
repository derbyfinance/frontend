import Notification from '@components/Notification'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import {
	getAllocationListState,
	setAllocationListState,
	setIsChangedState
} from '@store/RaceSlice'
import { getPlayerState, isConnectedState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import AllocateButton from './AllocateButton'
import AllocateSummaryRow from './AllocateSummaryRow'
import ConnectWalletButton from './ConnectWalletButton'
interface Props {
	update: (index: number) => void
	remove: (index: number) => void
}

const AllocateSummary = ({ update, remove }: Props) => {
	const dispatch = useAppDispatch()
	const rewards = useDerbyTokenBalance()
	const [isRebalance, setIsRebalance] = useState<boolean>(false)
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)

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

	useEffect(() => {
		dispatch(setIsChangedState(false))

		if (allocationList && allocationList?.length > 0) return

		player?.player.baskets[0]?.allocations?.map((allocation, index) => {
			const amount = Number(allocation)

			if (amount <= 0) return

			const nft = [...player.player.baskets].reverse()[0]

			const protocol = nft.vault.protocols.find(
				({ number }) => Number(number) === index
			)

			if (!protocol) return

			const item: AllocationRequestModel = {
				nft: nft.id,
				protocol: protocol.id,
				vault: nft.vault.number,
				amount: amount,
				maxAmount: 0
			}
			setIsRebalance(true)
			dispatch(setAllocationListState(item))
		})
	}, [player?.player?.baskets[0]?.allocations])

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

			{isConnected ? (
				<AllocateButton isRebalance={isRebalance} />
			) : (
				<ConnectWalletButton />
			)}
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
