'use client'

import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'
import CardTabMenu from '@components/card/CardTabMenu'
import { useState } from 'react'
import { styled } from 'styled-components'
import StakeForm from './StakeForm'
import Statistics from './Statistics'
import UnstakeForm from './UnstakeForm'
import VaultGraph from './VaultGraph'

const Content = () => {
	const [selected, setSelected] = useState<string>('Stake')

	return (
		<Container>
			<div>
				<h1>Restake</h1>
				<p>
					Stake ETH and receive back akkETH and start earning rewards and points
				</p>
			</div>

			<Card type="block">
				<XCardTabMenu
					menu={['Stake', 'Unstake']}
					selected={selected}
					onChange={setSelected}
				/>
				{selected === 'Stake' && (
					<CardContent>
						<StakeForm />
					</CardContent>
				)}
				{selected === 'Unstake' && (
					<CardContent>
						<UnstakeForm />
					</CardContent>
				)}
			</Card>

			<Card type="block">
				<XCardHeader>
					<h3>Vault Composition</h3>
					<p>Add a simple explanation of what this is about</p>
				</XCardHeader>
				<CardContent>
					<VaultGraph />
				</CardContent>
			</Card>

			<Card type="block">
				<CardContent>
					<Statistics />
				</CardContent>
			</Card>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`
const XCardTabMenu = styled(CardTabMenu)`
	margin: 2em;
	margin-bottom: 1em;
	padding: 0;
`
const XCardHeader = styled(CardHeader)`
	padding-bottom: 1em;

	& > div > p {
		font-family: inherit;
		color: inherit;
	}
`

export default Content
