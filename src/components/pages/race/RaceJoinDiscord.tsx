import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import DiscordMessageIcon from '@components/icons/socialIcons/DiscordMessageIcon'
import Link from 'next/link'
import { styled } from 'styled-components'

const RaceJoinDiscord = () => {
	return (
		<Link href="https://discord.gg/DyxRxs9mQ6">
			<RaceCard type="warning">
				<RaceContent>
					<h3>Join</h3>
					<IconWrapper>
						<DiscordMessageIcon />
					</IconWrapper>
					<span>Join the discussion on Discord</span>
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
	width: 50%;
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

export default RaceJoinDiscord
