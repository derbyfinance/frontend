import Badge from '@components/buttons/Badge'
import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { getAddressState, isConnectedState } from '@store/UserSlice'
import { useFormikContext } from 'formik'
import { MouseEvent, useCallback } from 'react'
import { styled } from 'styled-components'
import { Hex } from 'viem'

const PercentageBar = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const rewards = useDerbyTokenBalance(address)
	const { values, setFieldValue, validateOnBlur, handleBlur } =
		useFormikContext<AllocationRequestModel>()

	const isConnected = useAppSelector<boolean>(isConnectedState)
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)
	const list = [20, 40, 60, 80, 100]

	const handlePercentage = useCallback(
		(e: MouseEvent<HTMLButtonElement>, percentage: number): void => {
			const allocated =
				allocationList?.reduce((prev, allocate) => {
					return prev + allocate?.amount
				}, 0) ?? 0

			const value =
				Math.round(((rewards - allocated) / 100) * percentage * 100) / 100

			setFieldValue('amount', value)
			validateOnBlur
			handleBlur('amount')
			e.stopPropagation()
			e.preventDefault()
		},
		[rewards]
	)

	return (
		<Bar>
			{list.map((percentage, index) => (
				<Badge
					onClick={(e: MouseEvent<HTMLButtonElement>) =>
						handlePercentage(e, percentage)
					}
					name="amount"
					percentage={percentage}
					key={index}
					disabled={!isConnected || values.maxAmount <= 0}/>
			))}
		</Bar>
	)
}

const Bar = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.5em;
	margin-top: 0.5em;
`

export default PercentageBar
