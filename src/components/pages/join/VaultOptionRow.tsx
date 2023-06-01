import { FormikProps } from 'formik'

import { ToCurrency } from '@functions/CurrencyFunction'

import { VaultDtoModel } from '@models/dto/VaultDtoModel'

import Avatar from '@components/Avatar'
import RadioInputField from '@components/form/RadioInputField'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'

interface Props {
	inputName: string
	vault: VaultDtoModel
	formikProps: FormikProps<any>
}
export default ({ inputName, vault, formikProps }: Props) => {
	return (
		<TableRow>
			<TableData>
				<RadioInputField
					id={`radio-${inputName}-${vault.name}`}
					inputName={inputName}
					value={vault.symbol}
					formikProps={formikProps}
				/>
			</TableData>
			<TableData>
				<label htmlFor={`radio-${inputName}-${vault.name}`}>
					<Avatar name={vault.name} />
				</label>
			</TableData>
			<TableData $focus>
				<label htmlFor={`radio-${inputName}-${vault.name}`}>{vault.name}</label>
			</TableData>
			<TableData align="right">
				<label htmlFor={`radio-${inputName}-${vault.name}`}>
					{ToCurrency(vault.allocated, 2, true)}
				</label>
			</TableData>
			<TableData align="right">
				<label htmlFor={`radio-${inputName}-${vault.name}`}>
					{vault.performance}%
				</label>
			</TableData>
		</TableRow>
	)
}
