import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { useFormikContext } from 'formik'
import { MouseEvent } from 'react'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'

export default () => {
	const { isConnected } = useAccount()
	const rewards = useDerbyTokenBalance()
	const { values, setFieldValue, validateOnBlur, handleBlur } =
		useFormikContext<AllocationRequestModel>()
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)
	const list = [20, 40, 60, 80, 100]

	const handlePercentage = (
		e: MouseEvent<HTMLButtonElement>,
		percentage: number
	): void => {
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
	}

	return (
		<Bar>
			{list.map((percentage, index) => (
				<Badge
					type="button"
					onClick={(e: MouseEvent<HTMLButtonElement>) =>
						handlePercentage(e, percentage)
					}
					name="amount"
					$percentage={percentage}
					key={index}
					disabled={!isConnected || values.maxAmount <= 0}>
					{percentage == 100 ? 'Max' : `${percentage}%`}
				</Badge>
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
const Badge = styled.button<{ $percentage: number }>`
	background-color: ${({ theme, $percentage }) =>
		theme.style.colorLink + `${$percentage < 100 ? $percentage : ''}`};
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	color: ${({ theme }) => theme.style.buttonColor};
	border-radius: ${({ theme }) => theme.style.radius}px;
	padding: 0 0.5em;
	cursor: pointer;

	&:disabled,
	&[disabled] {
		background-color: ${({ theme, $percentage }) =>
			theme.style.colorDisabled + `${$percentage < 100 ? $percentage : ''}`};
		opacity: 0.5;
		pointer-events: none;
		cursor: hand;
	}
`
