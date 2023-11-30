import SelectInputField from '@components/form/SelectInputField'
import VaultIcon from '@components/icons/VaultIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getVaultListData, getVaultListState } from '@store/VaultSlice'
import { FormikProps, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

interface Props {
	formikProps: FormikProps<any>
}

const VaultSelect = ({}: Props) => {
	const dispatch = useAppDispatch()
	const formikProps = useFormikContext<AllocationRequestModel>()
	const { values } = formikProps

	const vaultList = useAppSelector<VaultDtoModel[] | undefined>(
		getVaultListState
	)
	const [selectedList, setSelectedList] = useState<VaultDtoModel[]>([])

	useEffect(() => {
		if (!vaultList || vaultList.length === 0) dispatch(getVaultListData())
	}, [])

	useEffect(() => {
		const list =
			vaultList?.filter(({ category, protocols }) => {
				return (
					protocols.find(
						({ id }) => id.toLowerCase() === values.protocol.toLowerCase()
					) !== undefined && category === 'Lending Borrowing'
				)
			}) ?? []

		setSelectedList(list)
	}, [values])

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
			smallOptionList
			optionList={selectedList.map(({ name, number }) => ({
				name: name,
				value: number
			}))}
			required
		/>
	)
}

export default VaultSelect
