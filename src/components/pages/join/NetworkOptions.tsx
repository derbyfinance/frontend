import { useEffect, useState } from 'react'

import { FormikProps } from 'formik'
import { styled } from 'styled-components'

import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import { GetNetworkList } from '@services/RaceService'

import Table from '@components/table/Table'

import NetworkOptionRow from './NetworkOptionRow'

interface Props {
	inputName: string
	formikProps: FormikProps<any>
}
export default ({ inputName, formikProps }: Props) => {
	const [networkList, setNetworkList] = useState<NetworkDtoModel[]>()

	const headers: TableHeaderModel[] = [
		{ name: 'Name', align: 'left', colspan: 3 },
		{ name: 'Allocated', align: 'right' }
	]

	useEffect(() => {
		getNetworkListData()
	}, [])

	const getNetworkListData = async () => {
		try {
			const { results } = await GetNetworkList()

			setNetworkList(results)
		} catch (error) {
			console.log(error)
		}
	}

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
