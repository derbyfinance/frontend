import { useEffect, useState } from 'react'

import { styled } from 'styled-components'

import { VaultDtoModel } from '@models/dto/VaultDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import { GetVaultList } from '@services/RaceService'

import ExpandButton from '@components/table/ExpandButton'
import Table from '@components/table/Table'

import RaceVaultboardRow from './RaceVaultboardRow'

export default () => {
	const amount: number = 5
	const [vaultboard, setVaultboard] = useState<VaultDtoModel[]>()
	const [count, setCount] = useState<number>(0)
	const [size, setSize] = useState<number | undefined>(amount)

	const headers: TableHeaderModel[] = [
		{ name: 'Name', colspan: 2 },
		{ name: 'Allocated', align: 'right' },
		{ name: 'Performance', align: 'right' },
		{ name: '' }
	]

	useEffect(() => {
		getVaultListData()
	}, [size])

	const getVaultListData = async () => {
		try {
			const { count, results } = await GetVaultList(size)
			setCount(count)
			setVaultboard(results)
		} catch (error) {
			console.log(error)
		}
	}

	const handleShow = (): void => {
		setSize(size ? undefined : amount)
	}

	return (
		<Container>
			<Table
				headers={headers}
				footer={
					count > amount ? (
						<ExpandButton isOpen={!size} handle={handleShow} />
					) : null
				}>
				{vaultboard?.map((vault, index) => (
					<RaceVaultboardRow key={index} vault={vault} />
				))}
			</Table>
		</Container>
	)
}

const Container = styled.div``
