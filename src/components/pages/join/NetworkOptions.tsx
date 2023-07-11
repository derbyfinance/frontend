import { FormikProps } from 'formik'
import { styled } from 'styled-components'

import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import Table from '@components/table/Table'

import NetworkOptionRow from './NetworkOptionRow'

interface Props {
	optionList: NetworkDtoModel[]
	inputName: string
	formikProps: FormikProps<any>
}
export default ({ optionList, inputName, formikProps }: Props) => {
	const headers: TableHeaderModel[] = [
		{ name: 'Name', align: 'left', colspan: 3 },
		{ name: 'Allocated', align: 'right' }
	]

	return (
		<Container>
			<Table $isSticky $isSmall headers={headers}>
				{optionList?.map((network, index) => (
					<NetworkOptionRow
						key={index}
						inputName={inputName}
						network={network}
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
