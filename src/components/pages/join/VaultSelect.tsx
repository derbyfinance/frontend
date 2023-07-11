import SelectInputField from '@components/form/SelectInputField'
import VaultIcon from '@components/icons/VaultIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import { getVaultListData, getVaultListState } from '@store/VaultSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import VaultOptions from './VaultOptions'

interface Props {
	formikProps: FormikProps<any>
}

const VaultSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const vaultList = useAppSelector<VaultDtoModel[]>(getVaultListState)

	useEffect(() => {
		if (vaultList && vaultList.length === 0) dispatch(getVaultListData())
	}, [])

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
			optionList={vaultList.map(({ name, vaultNumber }) => ({
				name: name,
				value: vaultNumber
			}))}
			options={
				<VaultOptions
					optionList={vaultList}
					inputName="vault"
					formikProps={formikProps}
				/>
			}
			required
		/>
	)
}

export default VaultSelect
