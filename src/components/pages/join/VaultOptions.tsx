import { useEffect, useState } from 'react'

import { FormikProps } from 'formik'
import { styled } from 'styled-components'

import { VaultDtoModel } from '@models/dto/VaultDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import { GetVaultList } from '@services/RaceService'

import Table from '@components/table/Table'

import VaultOptionRow from './VaultOptionRow'

interface Props {
	inputName: string
	formikProps: FormikProps<any>
}
export default ({ inputName, formikProps }: Props) => {
	const [vaultList, setVaultList] = useState<VaultDtoModel[]>()

	const headers: TableHeaderModel[] = [
		{ name: 'Name', align: 'left', colspan: 3 },
		{ name: 'Allocated', align: 'right' },
		{ name: 'Performance', align: 'right' }
	]

	useEffect(() => {
		getVaultListData()
	}, [])

	const getVaultListData = async () => {
		try {
			const { results } = await GetVaultList()

			setVaultList(results)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			<Table $isSticky $isSmall headers={headers}>
				{vaultList?.map((vault, index) => (
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
