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
		</TableRow>
	)
}
