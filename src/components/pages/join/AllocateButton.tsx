import ActionButton from '@components/buttons/ActionButton'
import { Small } from '@components/fonts/Title'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { useAppSelector } from '@hooks/ReduxStore'
import useMintBasket from '@hooks/UseMintNewBasket'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'

const AllocateButton = () => {
	const allocationList = useAppSelector<AllocationRequestModel[]>(
		getAllocationListState
	)

	// example usage
	const { write: writeMintNewBasket } = useMintBasket(10)

	return (
		<ActionButton $isCta $align="right" disabled={allocationList.length <= 0}>
			{/* example usage for writeMintNewBasket() */}
			<div onClick={() => writeMintNewBasket?.()}>
				{`Buy now  `}
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
	)
}

export default AllocateButton
