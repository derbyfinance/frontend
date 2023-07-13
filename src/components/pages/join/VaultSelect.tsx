import SelectInputField from '@components/form/SelectInputField'
import VaultIcon from '@components/icons/VaultIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import CategoryDtoModel from '@models/dto/CategoryDtoModel'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getCategoryListState } from '@store/RaceSlice'
import { getVaultListData, getVaultListState } from '@store/VaultSlice'
import { FormikProps, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import VaultOptions from './VaultOptions'

interface Props {
	formikProps: FormikProps<any>
}

const VaultSelect = ({}: Props) => {
	const dispatch = useAppDispatch()
	const formikProps = useFormikContext<AllocationRequestModel>()
	const { values } = formikProps

	const categoryList = useAppSelector<CategoryDtoModel[]>(getCategoryListState)
	const vaultList = useAppSelector<VaultDtoModel[]>(getVaultListState)
	const [selectedList, setSelectedList] = useState<VaultDtoModel[]>([])

	useEffect(() => {
		if (vaultList && vaultList.length === 0) dispatch(getVaultListData())
	}, [])

	useEffect(() => {
		const list = vaultList.filter(({ network, category, protocols }) => {
			return (
				protocols.find(
					({ id }) => id.toLowerCase() === values.protocol.toLowerCase()
				) !== undefined &&
				network.toLowerCase() === values.network.toLowerCase() &&
				categoryFilter(category).toLowerCase() === values.category.toLowerCase()
			)
		})

		setSelectedList(list)
	}, [values])

	//TODO: Ugly
	const categoryFilter = (category: string): string => {
		return (
			categoryList.find(
				({ name }) => name.toLowerCase() === category.toLowerCase()
			)?.id ?? ''
		)
	}

	return (
		<SelectInputField
			inputName="vault"
			label={
				<>
					<VaultIcon />
					<span>Vault</span>
				</>
			}
			formikProps={formikProps}
			placeholder="Select a vault"
			tabIndex={4}
			optionList={selectedList.map(({ name, vaultNumber }) => ({
				name: name,
				value: vaultNumber
			}))}
			options={
				<VaultOptions
					optionList={selectedList}
					inputName="vault"
					formikProps={formikProps}
				/>
			}
			required
		/>
	)
}

export default VaultSelect
