import { styled } from 'styled-components'

import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import LogoIcon from '@components/icons/LogoIcon'
import { StartCountdown } from '@functions/CounterFunction'

import Link from 'next/link'
import CircleGraph from '../CircleGraph'
import RaceTimer from './RaceTimer'

interface Props {
	$isClean?: boolean
}

const RaceCounter = ({ $isClean = false }: Props) => {
	const timer = StartCountdown({})

	return (
		<Link href="/race/join">
			<RaceCard type="cta" $isClean={$isClean}>
				<CounterContent>
					<h3>Next Race in</h3>
					<Counter>
						<CircleGraph initial={timer?.start} current={timer?.time} />
						<IconWrapper>
							<LogoIcon width="100%" height="100%" />
						</IconWrapper>
					</Counter>
					<RaceTimer countdown={timer} />
				</CounterContent>
			</RaceCard>
		</Link>
	)
}

const RaceCard = styled(Card)<{ $isClean?: boolean }>`
	${({ $isClean, theme }) =>
		$isClean &&
		`
		background-image: none;
		background-color: ${theme.style.colorLink};
	`}
	display: flex;
	flex: 1 1 auto;
	text-align: center;
`
const IconWrapper = styled.div`
	width: 2rem;
	height: 2rem;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
`
const CounterContent = styled(CardContent)`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
export default RaceCounter
