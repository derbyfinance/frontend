'use client'

import { useAppSelector } from '@hooks/ReduxStore'

import { isConnectedState } from '@store/UserSlice'
import { styled } from 'styled-components'
import AllocationBoard from './AllocationBoard'
import AllocationChart from './AllocationChart'

const Content = () => {
	const isConnected = useAppSelector<boolean>(isConnectedState)

	return (
		isConnected && (
			<Container>
				<InfoContainer>
					<h1>Your allocation</h1>
					<p>Who is in the race for you</p>
				</InfoContainer>

				<SplitContainer>
					<AllocationChart />
					<AllocationBoard />
				</SplitContainer>
			</Container>
		)
	)
}

const Container = styled.div``
const InfoContainer = styled.div``
const SplitContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 2em;
	align-items: center;
`

export default Content
