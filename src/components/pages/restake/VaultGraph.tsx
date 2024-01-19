import DoughnutChart from '@components/charts/DoughnutChart'
import { Colorpicker } from '@functions/ColorpickerFunction'
import { useAppSelector } from '@hooks/ReduxStore'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import { BasketDtoModel } from '@models/dto/PlayerDtoModel'
import ChartDataModel from '@models/internal/ChartDataModel'
import { getBasketCountState, getCurrentBasketState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const VaultGraph = () => {
	const basket = useAppSelector<BasketDtoModel | undefined>(
		getCurrentBasketState
	)
	const basketCount = useAppSelector<number>(getBasketCountState)
	const [allocationList, setAllocationList] = useState<ChartDataModel[]>([])
	const [legenda, setLegenda] = useState<ChartDataModel[]>([])

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

	useDidMountEffect(() => {
		const total = allocationList.reduce((prev, { data }) => prev + data, 0)

		const list = allocationList.map(({ label, data }, index) => {
			return { label: label, data: (data / total) * 100 }
		})

		setLegenda(list)
	}, [allocationList])

	return (
		<Container>
			<Chart>
				<DoughnutChart data={allocationList} />
			</Chart>
			<ul>
				{legenda.map(({ label, data }, index) => (
					<Info key={index}>
						<Label $color={Colorpicker(label)} />
						<span>{label}</span>
						<Percentage>{data}%</Percentage>
					</Info>
				))}
			</ul>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 4em;
	& > * {
		flex: 1 1 auto;
	}
`
const Info = styled.li`
	display: flex;
	justify-content: space-between;
	gap: 1em;
	& > * {
		flex: 1 1 auto;
	}
`
const Label = styled.div<{ $color: string }>`
	width: 2em;
	height: 2em;
	border-radius: 50%;
	background-color: ${({ $color }) => $color};
	flex: 0 0 auto;
`
const Percentage = styled.span`
	text-align: right;
`
const Chart = styled.div`
	flex: 0 1 auto;
	max-width: 12em;
`
export default VaultGraph
