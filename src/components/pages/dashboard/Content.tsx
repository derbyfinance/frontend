'use client'

import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'
import { useAppSelector } from '@hooks/ReduxStore'
import { CalculatePoints } from '@services/DepositService'
import { getAddressState, isConnectedState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Hex } from 'viem'
import RestakingList from './RestakingList'
import WalletConnect from './WalletConnect'

const Content = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const [userPoints, setUserPoints] = useState<BigInt>()

	useEffect(() => {
		if (address !== undefined) getInfo(address)
	}, [address])

	const getInfo = async (address: Hex) => {
		try {
			const { points } = await CalculatePoints(address)

			setUserPoints(points)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Container>
			<div>
				<h1>Dashboard</h1>
				<p>Overview of your restaking activities</p>
			</div>

			{isConnected ? (
				<Card type="block">
					<XCardHeader>
						<h3>Your balance</h3>
						<p>Add a simple explanation of what this is about</p>
					</XCardHeader>
					<div>{userPoints?.toString()}</div>
					<CardContent>
						<RestakingList />
					</CardContent>
				</Card>
			) : (
				<WalletConnect />
			)}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`
const XCardHeader = styled(CardHeader)`
	padding-bottom: 1em;

	& > div > p {
		font-family: inherit;
		color: inherit;
	}
`

export default Content
