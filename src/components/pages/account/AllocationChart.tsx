import DoughnutChart from '@components/charts/DoughnutChart'
import { useAppSelector } from '@hooks/ReduxStore'
import { BasketDtoModel } from '@models/dto/PlayerDtoModel'
import ChartDataModel from '@models/internal/ChartDataModel'
import { getBasketCountState, getCurrentBasketState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const AllocationChart = () => {
	const basket = useAppSelector<BasketDtoModel | undefined>(
		getCurrentBasketState
	)
	const basketCount = useAppSelector<number>(getBasketCountState)
	const [allocationList, setAllocationList] = useState<ChartDataModel[]>([])

	useEffect(() => {
		if (basket && basketCount > 0) {
			const allocations: string[] = basket?.allocations ?? []

			if (allocations.length === 0) return

			const list: ChartDataModel[] = basket.vault?.protocols?.map(
				(protocol) => {
					const amount = Number(allocations[Number(protocol.number)])
					return {
						label: protocol.name,
						data: amount
					}
				}
			)

			setAllocationList(list.filter((item) => item.data > 0))
		}
	}, [basket])

	return (
		<Chart>
			<DoughnutChart data={allocationList} />
		</Chart>
	)
}

const Chart = styled.div`
	flex: 0 1 auto;
	max-width: 12em;
`
export default AllocationChart
