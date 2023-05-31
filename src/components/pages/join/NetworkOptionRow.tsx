import { FormikProps } from 'formik'

import { ToCurrency } from '@functions/CurrencyFunction'

import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'

import Avatar from '@components/Avatar'
import RadioInputField from '@components/form/RadioInputField'
import TableData from '@components/table/TableData'
import TableRowLabel from '@components/table/TableRowLabel'

interface Props {
	inputName: string
	network: NetworkDtoModel
	formikProps: FormikProps<any>
}
export default ({ inputName, network, formikProps }: Props) => {
	return (
		<TableRowLabel htmlFor={`radio-${inputName}-${network.name}`}>
			<TableData>
				<RadioInputField
					id={`radio-${inputName}-${network.name}`}
					inputName={inputName}
					value={network.name}
					formikProps={formikProps}
				/>
			</TableData>
			<TableData>
				<Avatar name={network.name} />
			</TableData>
			<TableData $focus>{network.name}</TableData>
			<TableData align="right">
				{ToCurrency(network.allocated, 2, true)}
			</TableData>
		</TableRowLabel>
	)
}
