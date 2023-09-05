'use client'

import { styled } from 'styled-components'

import RaceCounter from './RaceCounter'
import RaceDescription from './RaceDescription'
import RaceLeaderboard from './RaceLeaderboard'
import RaceVaultboard from './RaceVaultboard'
import RaceGetStarted from './RaceGetStarted'

const Content = () => {
	return (
		<Container>
			<InfoContainer>
				<h1>The Race</h1>
				<p>Analyse, pick and follow your winners. Invest and allocate</p>
			</InfoContainer>
			<RaceDescription />
			<RaceInfo>
				<RaceGetStarted />
				<RaceCounter />
				<RaceCounter />	
			</RaceInfo>
			<InfoContainer>
				<h1>Leaderboard</h1>
				<p>
					Who are the best of the best. The 5 best are shown here as inspiration
					to follow.
				</p>
			</InfoContainer>
			<RaceLeaderboard />
			<InfoContainer>
				<h1>Best Performing Vaults</h1>
				<p>
					Who are the best of the best. The 5 best are shown here as inspiration
					to follow.
				</p>
			</InfoContainer>
			<RaceVaultboard />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`

const InfoContainer = styled.div``
const RaceInfo = styled.div`
	display: flex;
	gap: 1em;
	justify-content: space-between;

	> div {
		flex: 1 1 auto;
	}
`
export default Content