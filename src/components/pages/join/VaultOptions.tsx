import { useEffect } from 'react'

import { FormikProps } from 'formik'
import { styled } from 'styled-components'

import { VaultDtoModel } from '@models/dto/VaultDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import Table from '@components/table/Table'

import { useAppDispatch } from '@hooks/ReduxStore'
import { AppState } from '@store/Store'
import { getVaultListData, getVaultListState } from '@store/VaultSlice'
import { useSelector } from 'react-redux'
import VaultOptionRow from './VaultOptionRow'

interface Props {
	inputName: string
	formikProps: FormikProps<any>
}
export default ({ inputName, formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const vaultList = useSelector<AppState, VaultDtoModel[]>(getVaultListState)

	const headers: TableHeaderModel[] = [
		{ name: 'Name', align: 'left', colspan: 3 },
		{ name: 'Allocated', align: 'right' },
		{ name: 'Performance', align: 'right' }
	]

	useEffect(() => {
		if (vaultList && vaultList.length === 0) dispatch(getVaultListData())
	}, [])

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
