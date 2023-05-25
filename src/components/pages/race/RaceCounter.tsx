import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import LogoIcon from '@components/icons/LogoIcon'
import { styled } from 'styled-components'
import NetworkInfo from '../vault/NetworkInfo'
import LockIcon from '@components/icons/LockIcon'
import { ToCurrency } from '@functions/CurrencyFunction'
import MembersIcon from '@components/icons/MembersIcon'
import LinkButton from '@components/LinkButton'
import CircleGraph from '../CircleGraph'
import { StartCountdown } from '@functions/CounterFunction'
import RaceTimer from './RaceTimer'

export default () => {
	const timer = StartCountdown({})

	return (
		<Card isCta>
			<CounterContent>
				<CounterBlock>
					<Counter>
						<CircleGraph initial={timer?.start} current={timer?.time} />
						<IconWrapper>
							<LogoIcon width="100%" height="100%" />
						</IconWrapper>
					</Counter>
					<CountdownInfo>
						<h3>Next Race in</h3>
						<RaceTimer countdown={timer} />
					</CountdownInfo>
				</CounterBlock>
				<InfoBlock>
					<NetworkInfo
						icon={<LockIcon />}
						amount={ToCurrency(3117000, 2, true)}
						description={'Total value staked'}
					/>
					<NetworkInfo
						icon={<MembersIcon />}
						amount={2177}
						description={'Players'}
					/>
					<LinkButton $isGhost href="">
						Join the Race Today
					</LinkButton>
				</InfoBlock>
			</CounterContent>
		</Card>
	)
}

const IconWrapper = styled.div`
	width: 3rem;
	height: 3rem;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
`
const CounterContent = styled(CardContent)`
	display: flex;
	justify-content: space-between;
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

	* span:last-child {
		color: ${({ theme }) => theme.style.buttonColor};
	}
`
