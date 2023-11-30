import LinkButton from '@components/buttons/LinkButton'
import Table from '@components/table/Table'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import { useAppSelector } from '@hooks/ReduxStore'
import { BasketDtoModel } from '@models/dto/PlayerDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getBasketCountState, getCurrentBasketState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import AllocationBoardRow from './AllocationBoardRow'

const AllocationBoard = () => {
	const basket = useAppSelector<BasketDtoModel | undefined>(
		getCurrentBasketState
	)
	const basketCount = useAppSelector<number>(getBasketCountState)
	const [allocationList, setAllocationList] = useState<
		AllocationRequestModel[]
	>([])

	useEffect(() => {
		if (basket && basketCount > 0) {
			const allocations: string[] = basket?.allocations ?? []

			if (allocations.length === 0) return

			const list: AllocationRequestModel[] = basket.vault.protocols.map(
				(protocol) => {
					const amount = Number(allocations[Number(protocol.number)])
					return {
						nft: '',
						protocol: protocol.protocolName,
						amount: amount,
						vault: protocol.name,
						category: '',
						maxAmount: 0
					}
				}
			)

			setAllocationList(list.filter((item) => item.amount > 0))
		}
	}, [basket])

	const headers: TableHeaderModel[] = [
		{ name: 'LP Token' },
		{ name: 'Protocol' },
		{ name: 'Weight', align: 'right' },
		{ name: 'Value', align: 'right' }
	]

	return (
		<Container>
			<Table
				$isSmall={true}
				headers={headers}
				footer={
					<LinkButton href="/race/join" $isGhost $align="right">
						Rebalance your allocation
					</LinkButton>
				}>
				{allocationList?.map((allocation, index) => (
					<AllocationBoardRow key={index} allocation={allocation} />
				))}
				{allocationList?.length === 0 ? (
					<TableRow>
						<TableData $align={'center'} colSpan={4}>
							No allocations created
						</TableData>
					</TableRow>
				) : null}
			</Table>
		</Container>
	)
}

const Container = styled.div`
	flex: 1 1 auto;
`

export default AllocationBoard
