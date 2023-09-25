import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import CategoryDtoModel from '@models/dto/CategoryDtoModel'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import { getCategoryListState } from '@store/RaceSlice'
import { getVaultListData, getVaultListState } from '@store/VaultSlice'
import { FormikProps } from 'formik'
import { useCallback, useEffect } from 'react'
import SelectInputField from './form/SelectInputField'

interface Props {
	formikProps: FormikProps<any>
}

const CoinSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const vaultList = useAppSelector<VaultDtoModel[] | undefined>(
		getVaultListState
	)
	const categoryList = useAppSelector<CategoryDtoModel[] | undefined>(
		getCategoryListState
	)

	useEffect(() => {
		if (!vaultList || vaultList.length === 0) dispatch(getVaultListData())
	}, [])

	//TODO: Ugly
	const categoryFilter = useCallback((category: string): string => {
		return categoryList?.find(({ name }) => name === category)?.id ?? ''
	}, [formikProps.values])

	return (
		<SelectInputField
			inputName="coin"
			label="Coin"
			smallOptionList
			placeholder="Select a coin"
			formikProps={formikProps}
			optionList={
				vaultList
					?.filter(
						({ category }) =>
							categoryFilter(category) === formikProps.values['category']
					)
					.map(({ name, id }) => ({
						name: name,
						value: id
					})) ?? []
			}
		/>
	)
}

export default CoinSelect
