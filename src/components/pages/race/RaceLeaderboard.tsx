import { useEffect, useState } from 'react'

import { styled } from 'styled-components'

import { LeaderboardDtoModel } from '@models/dto/LeaderboardDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import { GetLeaderboard } from '@services/RaceService'

import ExpandButton from '@components/table/ExpandButton'
import Table from '@components/table/Table'

import RaceLeaderboardRow from './RaceLeaderboardRow'

export default () => {
	const amount: number = 5
	const [leaderboard, setLeaderboard] = useState<LeaderboardDtoModel[]>()
	const [count, setCount] = useState<number>(0)
	const [size, setSize] = useState<number | undefined>(amount)

	const headers: TableHeaderModel[] = [
		{ name: 'Name', colspan: 2 },
		{ name: 'Medals', align: 'right' },
		{ name: 'Staked', align: 'right' },
		{ name: 'Performance', align: 'right' },
		{ name: '' }
	]

	useEffect(() => {
		getLeaderboardData()
	}, [size])

	const getLeaderboardData = async () => {
		try {
			const { count, results } = await GetLeaderboard(size)
			setCount(count)
			setLeaderboard(results)
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
				{leaderboard?.map((leader, index) => (
					<RaceLeaderboardRow key={index} leader={leader} />
				))}
			</Table>
		</Container>
	)
}

const Container = styled.div``
