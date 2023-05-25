'use client'

import { styled } from 'styled-components'
import RaceDescription from './RaceDescription'
import RaceCounter from './RaceCounter'

export default () => {
	return (
		<Container>
			<h1>The Race</h1>
			<p>Analyse, pick and follow your winners. Invest and allocate</p>

			<RaceDescription />
			<RaceCounter />
			<h1>Leaderboard</h1>
			<p>
				Who are the best of the best. The 5 best are shown here as inspiration
				to follow.
			</p>
		</Container>
	)
}

const Container = styled.div``
