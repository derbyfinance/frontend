import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import { getVaultListData, getVaultListState } from '@store/VaultSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import SelectInputField from './form/SelectInputField'

interface Props {
	formikProps: FormikProps<any>
}

const CoinSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const vaultList = useAppSelector<VaultDtoModel[] | undefined>(
		getVaultListState
	)

	useEffect(() => {
		if (!vaultList || vaultList.length === 0) dispatch(getVaultListData())
	}, [])

	return (
		<SelectInputField
			inputName="coin"
			label="Coin"
			smallOptionList
			placeholder="Select a coin"
			formikProps={formikProps}
			optionList={
				vaultList
					?.filter(({ category }) => category === 'Lending Borrowing')
					.map(({ name, id }) => ({
						name: name,
						value: id
					})) ?? []
			}
		/>
	)
}

export default CoinSelect
