import StockCurrency from '@components/StockCurrency'
import { LazyColorPicker } from '@functions/ColorpickerFunction'
import { useAppSelector } from '@hooks/ReduxStore'
import { BasketDtoModel } from '@models/dto/PlayerDtoModel'
import ChartDataModel from '@models/internal/ChartDataModel'
import { getBasketCountState, getCurrentBasketState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const RestakingList = () => {
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

			setAllocationList(list)
		}
	}, [basket, basketCount])

	return (
		<ul>
			{allocationList.map(({ label, data }, index) => (
				<Info key={index}>
					{/* <Label $color={Colorpicker(label)} /> */}
					<Label $color={LazyColorPicker[index]} />
					<span>{label}</span>
					<Percentage>
						{data > 0 ? (
							<StockCurrency $amount={data} $coin="ETH" $color="inherit" />
						) : (
							'-'
						)}
					</Percentage>
				</Info>
			))}
		</ul>
	)
}

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
export default RestakingList
