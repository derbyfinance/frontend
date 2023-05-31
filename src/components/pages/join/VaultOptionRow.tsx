import { FormikProps } from 'formik'

import { ToCurrency } from '@functions/CurrencyFunction'

import { VaultDtoModel } from '@models/dto/VaultDtoModel'

import Avatar from '@components/Avatar'
import RadioInputField from '@components/form/RadioInputField'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import TableRowLabel from '@components/table/TableRowLabel'

interface Props {
	inputName: string
	vault: VaultDtoModel
	formikProps: FormikProps<any>
}
export default ({ inputName, vault, formikProps }: Props) => {
	return (
		<TableRowLabel htmlFor={`radio-${inputName}-${vault.name}`}>
			<TableData>
				<RadioInputField
					id={`radio-${inputName}-${vault.name}`}
					inputName={inputName}
					value={vault.name}
					formikProps={formikProps}
				/>
			</TableData>
			<TableData>
				<Avatar name={vault.name} />
			</TableData>
			<TableData $focus>{vault.name}</TableData>
			<TableData align="right">
				{ToCurrency(vault.allocated, 2, true)}
			</TableData>
			<TableData align="right">{vault.performance}%</TableData>
		</TableRowLabel>
	)
}
