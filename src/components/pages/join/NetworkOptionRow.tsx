import { FormikProps } from 'formik'

import { ToCurrency } from '@functions/CurrencyFunction'

import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'

import Avatar from '@components/Avatar'
import RadioInputField from '@components/form/RadioInputField'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'

interface Props {
	inputName: string
	network: NetworkDtoModel
	formikProps: FormikProps<any>
}
export default ({ inputName, network, formikProps }: Props) => {
	return (
		<TableRow>
			<TableData>
				<RadioInputField
					id={`radio-${inputName}-${network.name}`}
					inputName={inputName}
					value={network.symbol}
					formikProps={formikProps}
					checked={formikProps.values[inputName] === network.symbol}
				/>
			</TableData>
			<TableData>
				<label htmlFor={`radio-${inputName}-${network.name}`}>
					<Avatar name={network.name} />
				</label>
			</TableData>
			<TableData $focus>
				<label htmlFor={`radio-${inputName}-${network.name}`}>
					{network.name}
				</label>
			</TableData>
			<TableData align="right">
				<label htmlFor={`radio-${inputName}-${network.name}`}>
					{ToCurrency(network.allocated, 2, true)}
				</label>
			</TableData>
		</TableRow>
	)
}
