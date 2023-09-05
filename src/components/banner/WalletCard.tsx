
import StockCurrency from '@components/StockCurrency'
import StockBadge from '@components/badges/StockBadge'
import ActionButton from '@components/buttons/ActionButton'
import CardFooter from '@components/card/CardFooter'
import CardRow from '@components/card/CardRow'
import RewardsIcon from '@components/icons//RewardsIcon'
import GraphIcon from '@components/icons/GraphIcon'
import PortfolioIcon from '@components/icons/PortfolioIcon'
import { styled } from 'styled-components'

const WalletCard = () => {
    return (
        <>
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
				<StockCurrency $amount={1234} $decimals={0} $coin="DRB" />
			</CardRow>
			<CardFooter $align="right">
				<ActionButton $isCta onClick={() => {}}>
					Claim Rewards
				</ActionButton>
            </CardFooter>
        </>
   )
}

const CardSpace = styled.div`
	margin: 2em 0;
`
const Label = styled.span`
	font-family: ${({ theme }) => theme.fonts.slabMedium};
`
const Amount = styled.div``

export default WalletCard