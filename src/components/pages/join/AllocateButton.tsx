import ActionButton from '@components/buttons/ActionButton'
import { Small } from '@components/fonts/Title'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { useAppSelector } from '@hooks/ReduxStore'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'

const AllocateButton = () => {
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)

	return (
		<ActionButton
			$isCta
			$align="right"
			disabled={!allocationList || allocationList?.length <= 0}>
			<div onClick={() => {}}>
				{`Buy now  `}
				{ToCoinCurrency(
					allocationList?.reduce((prev, allocate) => {
						return prev + allocate?.amount
					}, 0) ?? 0,
					0
				)}
				{` `}
				<Small>DRB</Small>
			</div>
		</ActionButton>
	)
}

export default AllocateButton
