'use client'

import { styled } from 'styled-components'

import RaceCounter from './RaceCounter'
import RaceDescription from './RaceDescription'
import RaceLeaderboard from './RaceLeaderboard'
import RaceVaultboard from './RaceVaultboard'

export default () => {
  return (
    <Container>
      <h1>The Race</h1>
      <p>Analyse, pick and follow your winners. Invest and allocate</p>

      <RaceDescription />
      <RaceCounter />
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

const Container = styled.div``

const InfoContainer = styled.div`
	margin-top: 2em;
`