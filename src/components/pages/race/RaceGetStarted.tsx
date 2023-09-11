import { styled } from 'styled-components'
import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import RocketIcon from '@components/icons/RocketIcon'
import Link from 'next/link'

interface Props {
	$isClean?: boolean
}

const RaceGetStarted = ({ $isClean = false }: Props) => {
	return (
		<Link href="/race/join">
			<RaceCard type='info' $isClean={$isClean}>
				<RaceContent>
					<h3>Get Started</h3>
					<IconWrapper>
						<RocketIcon />
					</IconWrapper>
					<span>How to place a race</span>
				</RaceContent>
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

`
const RaceContent = styled(CardContent)`
	flex: 1 1 auto;	
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1em;

	> * {
		flex: 1 1 auto;
	}
`

export default RaceGetStarted