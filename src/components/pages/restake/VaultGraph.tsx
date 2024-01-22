import DoughnutChart from '@components/charts/DoughnutChart'
import { Colorpicker } from '@functions/ColorpickerFunction'
import { device } from '@helpers/DeviceHelper'
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

	flex-direction: column;

	@media ${device.laptop} {
		flex-direction: row;
	}
`
const Info = styled.li`
	display: flex;
	justify-content: space-between;
	gap: 1em;
	padding: 0.5em 0;

	& > * {
		flex: 1 1 auto;
	}
`
const Label = styled.div<{ $color: string }>`
	width: 1.5em;
	height: 1.5em;
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

	align-self: center;

	@media ${device.laptop} {
		align: flex-start;
	}
`
export default VaultGraph
