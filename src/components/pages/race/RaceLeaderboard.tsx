import { useEffect, useState } from 'react'

import { styled } from 'styled-components'

import { LeaderboardDtoModel } from '@models/dto/LeaderboardDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'

import ExpandButton from '@components/table/ExpandButton'
import Table from '@components/table/Table'

import { useAppDispatch } from '@hooks/ReduxStore'
import {
	getLeaderboardListCountState,
	getLeaderboardListData,
	getLeaderboardListState
} from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { useSelector } from 'react-redux'
import RaceLeaderboardRow from './RaceLeaderboardRow'

export default () => {
	const amount: number = 5
	const dispatch = useAppDispatch()

	const leaderboardList = useSelector<AppState, LeaderboardDtoModel[]>(
		getLeaderboardListState
	)
	const leaderboardListCount = useSelector<AppState, number>(
		getLeaderboardListCountState
	)

	const [size, setSize] = useState<number | undefined>(amount)

	const headers: TableHeaderModel[] = [
		{ name: 'Name', colspan: 2 },
		{ name: 'Medals', align: 'right' },
		{ name: 'Staked', align: 'right' },
		{ name: 'Performance', align: 'right' },
		{ name: '' }
	]

	useEffect(() => {
		dispatch(getLeaderboardListData(size))
	}, [size])

	const handleShow = (): void => {
		setSize(size ? undefined : amount)
	}

	return (
		<Container>
			<Table
				headers={headers}
				footer={
					leaderboardListCount > amount ? (
						<ExpandButton isOpen={!size} handle={handleShow} />
					) : null
				}>
				{leaderboardList?.map((leader, index) => (
					<RaceLeaderboardRow key={index} leader={leader} />
				))}
			</Table>
		</Container>
	)
}

const Container = styled.div``
