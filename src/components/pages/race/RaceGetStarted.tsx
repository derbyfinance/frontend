import { styled } from 'styled-components'

import { StartCountdown } from '@functions/CounterFunction'
import { ToCurrency } from '@functions/CurrencyFunction'

import NetworkInfo from '@components/NetworkInfo'
import LinkButton from '@components/buttons/LinkButton'
import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import LockIcon from '@components/icons/LockIcon'
import LogoIcon from '@components/icons/LogoIcon'
import MembersIcon from '@components/icons/MembersIcon'

import CircleGraph from '../CircleGraph'
import RaceTimer from './RaceTimer'
import RocketIcon from '@components/icons/RocketIcon'

interface Props {
	$isClean?: boolean
}

const RaceGetStarted = ({ $isClean = false }: Props) => {
	const timer = StartCountdown({})

	return (
		<RaceCard type='info' $isClean={$isClean}>
			<CounterContent>
				<h3>Get Started</h3>
				<IconWrapper>
					<RocketIcon />
				</IconWrapper>
				<span>How to place a race</span>
			</CounterContent>
		</RaceCard>
	)
}

const RaceCard = styled(Card)<{ $isClean?: boolean }>`
	${({ $isClean, theme }) =>
		$isClean &&
		`
		background-image: none;
		background-color: ${theme.style.colorLink};
	`}
`
const IconWrapper = styled.div`

`
const CounterContent = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1em;

	> * {
		flex: 1 1 auto;
	}
`
const CountdownInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`
const CounterBlock = styled.div`
	flex: 1 1 auto;
	display: flex;
	gap: 1em;
`
const Counter = styled.div`
	flex: 0 0 7rem;
	position: relative;
	max-width: 6em;
	> svg {
		display: block;
	}
`
const InfoBlock = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-content: center;
	gap: 1em;
	min-width: 33%;
	* span:last-child {
		color: ${({ theme }) => theme.style.buttonColor};
	}
`
export default RaceGetStarted