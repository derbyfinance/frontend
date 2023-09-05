import Table from '@components/table/Table'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import { FormikProps } from 'formik'
import { styled } from 'styled-components'
import VaultOptionRow from './VaultOptionRow'

interface Props {
	optionList: VaultDtoModel[]
	inputName: string
	formikProps: FormikProps<any>
}
const VaultOptions = ({ optionList, inputName, formikProps }: Props) => {
	const headers: TableHeaderModel[] = [
		{ name: 'Name', align: 'left', colspan: 3 },
		{ name: 'Allocated', align: 'right' },
		{ name: 'Performance', align: 'right' }
	]

	return (
		<Container>
			<Table $isSticky $isSmall headers={headers}>
				{optionList.map((vault, index) => (
					<VaultOptionRow
						key={index}
						vault={vault}
						inputName={inputName}
						formikProps={formikProps}
					/>
				))}
			</Table>
		</Container>
	)
}

const Container = styled.div`
	overflow: hidden;
	overflow-y: scroll;
	max-height: 20em;
`
export default VaultOptions