import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { getAddressState } from '@store/UserSlice'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { Hex } from 'viem'

const MaxAmountHiddenInput = () => {
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const rewards = useDerbyTokenBalance(address)
	const { handleChange, values, setFieldValue, isValid } =
		useFormikContext<AllocationRequestModel>()

	const inputName = 'maxAmount'

	useEffect(() => {
		const allocated =
			allocationList?.reduce((prev, allocate) => {
				return prev + allocate?.amount
			}, 0) ?? 0

		setFieldValue(inputName, Math.round((rewards - allocated) * 100) / 100)
	}, [allocationList, isValid, rewards])

	return (
		<input
			type="hidden"
			id={inputName}
			name={inputName}
			required={true}
			onChange={handleChange}
			value={values.maxAmount}
		/>
	)
}

export default MaxAmountHiddenInput
