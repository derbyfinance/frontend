import ActionButton from '@components/buttons/ActionButton'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import useMintBasket from '@hooks/UseMintNewBasket'
import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'
import { getAllocationState } from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const AllocateButton = () => {
	const allocationList = useSelector<AppState, AllocationRequestModel[]>(
		getAllocationState
	)

	// example usage
	const { writeMintNewBasket } = useMintBasket(10)

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

const Small = styled.span`
	font-size: 0.75em;
`

export default AllocateButton
