import Table from '@components/table/Table'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import { SelectOptionModel } from '@models/internal/SelectOptionModel'
import { FormikProps } from 'formik'
import { styled } from 'styled-components'
import RadioInputField from './RadioInputField'

interface Props {
	optionList: SelectOptionModel[]
	inputName: string
	formikProps: FormikProps<any>
}

const SelectOptionList = ({ optionList, inputName, formikProps }: Props) => {
	return (
		<Table isSmall>
			{optionList?.map(({ value, name }, index) => (
				<TableRow
					key={index}
					$isActive={formikProps.values[inputName] === value}>
					<TableData>
						<HiddenRadioInputField
							id={`radio-${inputName}-${value}`}
							inputName={inputName}
							value={value}
							formikProps={formikProps}
							checked={formikProps.values[inputName] === value}
						/>
						<label htmlFor={`radio-${inputName}-${value}`}>{name}</label>
					</TableData>
				</TableRow>
			))}

			{optionList && optionList.length <= 0 && (
				<TableRow>
					<TableData>
						<label>No items</label>
					</TableData>
				</TableRow>
			)}
		</Table>
	)
}

const HiddenRadioInputField = styled(RadioInputField)`
	display: none;
`
export default SelectOptionList
