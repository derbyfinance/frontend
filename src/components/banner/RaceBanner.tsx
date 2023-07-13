'use client'

import StockCurrency from '@components/StockCurrency'
import StockBadge from '@components/badges/StockBadge'
import ActionButton from '@components/buttons/ActionButton'
import CardFooter from '@components/card/CardFooter'
import CardRow from '@components/card/CardRow'
import RewardsIcon from '@components/icons//RewardsIcon'
import GraphIcon from '@components/icons/GraphIcon'
import PortfolioIcon from '@components/icons/PortfolioIcon'
import RewardIcon from '@components/icons/RewardIcon'
import StakedIcon from '@components/icons/StakedIcon'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import { styled } from 'styled-components'
import RewardBox from '../pages/race/RewardBox'

const RaceBanner = () => {
	const rewards = useDerbyTokenBalance()

	return (
		<BannerBox>
			<div>
				<Title>Your Race</Title>
				<p>Your race performance statistics</p>
			</div>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<StakedIcon />
					<Label>Staked amount</Label>
				</div>
				<StockCurrency $amount={11645} $decimals={0} $coin="USDC" />
			</CardRow>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<GraphIcon />
					<Label>Performance</Label>
				</div>
				<Amount>
					<StockCurrency
						$amount={84585}
						$isStock={true}
						$decimals={0}
						$coin={''}
					/>
					<StockBadge $amount={0.129} />
				</Amount>
			</CardRow>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<RewardIcon />
					<Label>Rewards</Label>
				</div>
				<StockCurrency $amount={4.56} $coin="DRB" />
			</CardRow>
			<CardRow $hasHover={false} $isFlex>
				<RewardBox $amount={3} $type="Gold" />
				<RewardBox $amount={1} $type="Silver" />
				<RewardBox $amount={0} $type="Bronze" />
			</CardRow>
			<CardSpace>
				<h3>Your Wallet</h3>
				<p>What you have and how its performed</p>
			</CardSpace>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<PortfolioIcon />
					<Label>Portfolio</Label>
				</div>
				<StockCurrency $amount={-11645} $decimals={0} $coin="USDC" />
			</CardRow>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<GraphIcon />
					<Label>Performance</Label>
				</div>
				<Amount>
					<StockCurrency
						$amount={-84585}
						$isStock={true}
						$decimals={0}
						$coin={''}
					/>
					<StockBadge $amount={-0.229} />
				</Amount>
			</CardRow>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<RewardsIcon />
					<Label>Rewards</Label>
				</div>
				<StockCurrency $amount={rewards} $decimals={0} $coin="DRB" />
			</CardRow>
			<CardFooter $align="right">
				<ActionButton $isCta onClick={() => {}}>
					Claim Rewards
				</ActionButton>
			</CardFooter>
		</BannerBox>
	)
}

const BannerBox = styled.div`
	position: sticky;
	top: 1em;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	padding: 2em;
`
const Title = styled.h3`
	color: ${({ theme }) => theme.style.colorCta};
`
const Label = styled.span`
	font-family: ${({ theme }) => theme.fonts.slabMedium};
`
const Amount = styled.div``
const CardSpace = styled.div`
	margin: 2em 0;
`
const Spacer = styled.div`
	min-width: 1em;
`

export default RaceBanner
