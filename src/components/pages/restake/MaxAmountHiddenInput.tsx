import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import StakeRequestModel from '@models/requests/StakeRequestModel'
import { getAddressState } from '@store/UserSlice'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { Hex } from 'viem'
import { useChainId } from 'wagmi'

const MaxAmountHiddenInput = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const chainId = useChainId()
	const { rewards } = useDerbyTokenBalance(chainId, address)
	const { handleChange, values, setFieldValue, isValid } =
		useFormikContext<StakeRequestModel>()

	const inputName = 'maxAmount'

	useEffect(() => {
		setFieldValue(inputName, rewards)
	}, [isValid, rewards, setFieldValue])

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
