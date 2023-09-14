import { useEffect, useState } from 'react'

import { styled } from 'styled-components'

import TableHeaderModel from '@models/internal/TableHeaderModel'

import ExpandButton from '@components/table/ExpandButton'
import Table from '@components/table/Table'

import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import {
	getVaultListCountState,
	getVaultListData,
	getVaultListState
} from '@store/VaultSlice'
import RaceVaultboardRow from './RaceVaultboardRow'

interface Props {
	$hasMargin?: boolean
}

const RaceVaultboard = ({ $hasMargin = true}: Props) => {
	const amount: number = 5
	const dispatch = useAppDispatch()

	const vaultList = useAppSelector<VaultDtoModel[] | undefined>(
		getVaultListState
	)
	const vaultListCount = useAppSelector<number>(getVaultListCountState)

	const [size, setSize] = useState<number | undefined>(amount)

	const headers: TableHeaderModel[] = [
		{ name: 'Name', colspan: 2 },
		{ name: 'Allocated', align: 'right' },
		{ name: 'Performance', align: 'right' },
		{ name: '' }
	]

	useEffect(() => {
		if (!vaultList || vaultList.length === 0) dispatch(getVaultListData(size))
	}, [size])

	const handleShow = (): void => {
		setSize(size ? undefined : amount)
	}

	return (
		<Container>
			<Table
				$isSmall={!$hasMargin}
				headers={headers}
				footer={
					vaultListCount > amount ? (
						<ExpandButton isOpen={!size} handle={handleShow} />
					) : null
				}>
				{vaultList?.map((vault, index) => (
					<RaceVaultboardRow key={index} vault={vault} />
				))}
			</Table>
		</Container>
	)
}

const Container = styled.div``

export default RaceVaultboard