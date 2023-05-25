import { useEffect, useState } from 'react'

import { styled } from 'styled-components'

import { LeaderboardDtoModel } from '@models/dto/LeaderboardDtoModel'

import { GetLeaderboard } from '@services/RaceService'

export default () => {
	const [leaderboard, setLeaderboard] = useState<LeaderboardDtoModel[]>()

	useEffect(() => {
		getLeaderboardData()
	}, [])

	const getLeaderboardData = async () => {
		try {
			const { results } = await GetLeaderboard()
			setLeaderboard(results)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			{leaderboard?.map(({ name }, index) => (
				<div key={index}>{name}</div>
			))}
		</Container>
	)
}

const Container = styled.div``
