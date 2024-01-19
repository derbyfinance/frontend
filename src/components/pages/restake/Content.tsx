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
			<InfoContainer>
				<h1>Restake</h1>
				<p>
					Stake ETH and receive back dfETH and start earning rewards and points
				</p>
			</InfoContainer>

			<XCard>
				<XCardTabMenu
					menu={['Stake', 'Unstake']}
					selected={selected}
					onChange={setSelected}
				/>
				{selected === 'Stake' && (
					<XCardContent>
						<StakeForm />
					</XCardContent>
				)}
				{selected === 'Unstake' && (
					<XCardContent>
						<UnstakeForm />
					</XCardContent>
				)}
			</XCard>

			<XCard>
				<XCardHeader>
					<h3>Vault Composition</h3>
					<p>Add a simple explanation of what this is about</p>
				</XCardHeader>
				<XCardContent>
					<VaultGraph />
				</XCardContent>
			</XCard>

			<XCard>
				<XCardContent>
					<Statistics />
				</XCardContent>
			</XCard>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`
const InfoContainer = styled.div``
const XCard = styled(Card)`
	background-color: ${({ theme }) => theme.style.formBg};
	border: none;
`
const XCardTabMenu = styled(CardTabMenu)`
	margin: 2em;
	margin-bottom: 1em;
	padding: 0;
`
const XCardHeader = styled(CardHeader)`
	margin: 2em;
	margin-bottom: 1em;
	padding: 0;

	& p {
		font-family: inherit;
		color: inherit;
	}
`
const XCardContent = styled(CardContent)<{ id: string }>``

export default Content
