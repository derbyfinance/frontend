import { useEffect } from 'react'

import { FormikProps } from 'formik'
import { styled } from 'styled-components'

import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import Table from '@components/table/Table'

import { useAppDispatch } from '@hooks/ReduxStore'
import { getNetworkListData, getNetworkListState } from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { useSelector } from 'react-redux'
import NetworkOptionRow from './NetworkOptionRow'

interface Props {
	inputName: string
	formikProps: FormikProps<any>
}
export default ({ inputName, formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const networkList = useSelector<AppState, NetworkDtoModel[]>(
		getNetworkListState
	)

	const headers: TableHeaderModel[] = [
		{ name: 'Name', align: 'left', colspan: 3 },
		{ name: 'Allocated', align: 'right' }
	]

	useEffect(() => {
		if (networkList && networkList.length === 0) dispatch(getNetworkListData())
	}, [])

	return (
		<Container>
			<Table $isSticky $isSmall headers={headers}>
				{networkList?.map((network, index) => (
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
