'use client'

import StockCurrency from '@components/StockCurrency'
import StockBadge from '@components/badges/StockBadge'
import CardRow from '@components/card/CardRow'
import GraphIcon from '@components/icons/GraphIcon'
import RewardIcon from '@components/icons/RewardIcon'
import StakedIcon from '@components/icons/StakedIcon'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import RewardBox from '../pages/race/RewardBox'
import WalletCard from './WalletCard'
import ActionButton from '@components/buttons/ActionButton'
import LinkButton from '@components/buttons/LinkButton'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getPlayerState } from '@store/UserSlice'
import { setCreateNftModalOpenState } from '@store/SettingsSlice'
import BigNumber from 'bignumber.js'

const RaceBanner = () => {
	const [derbyBalance, setDerbyBalance] = useState<number>(0)
	const balance = useDerbyTokenBalance()
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		setDerbyBalance(balance)
	}, [balance])

	const handleModal = useCallback(() => { 
		dispatch(setCreateNftModalOpenState(true))
	}, [])
	
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
				<StockCurrency $amount={Number(player?.player.baskets[0].stakedAmount ?? 0)} $decimals={0} $coin="USDC" />
			</CardRow>
			<CardRow $hasHover={false} $isFlex>
				<div>
					<GraphIcon />
					<Label>Performance</Label>
				</div>
				<Amount>
					<StockCurrency
						$amount={0}
						$isStock={true}
						$decimals={0}
						$coin={''}
					/>
					<StockBadge $amount={0} />
				</Amount>
			</CardRow>
			<CardRow $hasHover={false} $isFlex $hasBorder={false}>
				<div>
					<RewardIcon />
					<Label>Rewards</Label>
				</div>
				<StockCurrency $amount={Number(new BigNumber(player?.player.baskets[0].redeemedRewards ?? 0).div(10000000))} $coin="DRB" />
			</CardRow>
			{/*<CardRow $hasHover={false} $isFlex>
				<RewardBox $amount={3} $type="Gold" />
				<RewardBox $amount={1} $type="Silver" />
				<RewardBox $amount={0} $type="Bronze" />
			</CardRow>
			 <WalletCard/> */}
			
			<LinkButton $isBlock href="/race/join" $isGhost onClick={(!player?.player || player?.player?.baskets.length === 0)? handleModal: undefined}>
				{(!player?.player || player?.player?.baskets.length === 0) ? 'Create NFT' : 'Rebalance'}
			</LinkButton>
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


export default RaceBanner
