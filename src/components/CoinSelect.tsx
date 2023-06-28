import { useAppDispatch } from '@hooks/ReduxStore'
import { VaultDtoModel } from '@models/dto/VaultDtoModel'
import { getCategoryListData } from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { getVaultListState } from '@store/VaultSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SelectInputField from './form/SelectInputField'

interface Props {
	formikProps: FormikProps<any>
}

const CoinSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const vaultList = useSelector<AppState, VaultDtoModel[]>(getVaultListState)

	useEffect(() => {
		dispatch(getCategoryListData())
	}, [])

	return (
		<SelectInputField
			inputName="coin"
			label="Coin"
			smallOptionList
			placeholder="Select a coin"
			formikProps={formikProps}
			optionList={vaultList.map(({ name, id }) => ({
				name: name,
				value: id
			}))}
		/>
	)
}

export default CoinSelect
