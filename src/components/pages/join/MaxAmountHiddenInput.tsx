import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'

const MaxAmountHiddenInput = () => {
	const rewards = useDerbyTokenBalance()
	const { handleChange, values, setFieldValue } =
		useFormikContext<AllocationRequestModel>()
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)
	const inputName = 'maxAmount'

	useEffect(() => {
		const allocated =
			allocationList?.reduce((prev, allocate) => {
				return prev + allocate?.amount
			}, 0) ?? 0

		setFieldValue(inputName, Math.round((rewards - allocated) * 100) / 100)
	}, [allocationList])

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
