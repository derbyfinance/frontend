import StockCurrency from '@components/StockCurrency'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { useAppSelector } from '@hooks/ReduxStore'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import { getVaultListState } from '@store/VaultSlice'
import BigNumber from 'bignumber.js'
import { styled } from 'styled-components'

const KeyStatistics = () => {
	const vaultList = useAppSelector<VaultDtoModel[] | undefined>(
		getVaultListState
	)

	return (
		<>
			<InfoContainer>
				<h1>Key Statistics</h1>
				<p>The most important data of this vault, use it to compare.</p>
			</InfoContainer>
			<Container>
				<Statistic>
					<Title>#{vaultList?.[0].races.length}</Title>
					<Info>Race number</Info>
				</Statistic>
				<Statistic>
					<Title>
						{ToCoinCurrency(vaultList?.[0].baskets.length ?? 0, 0, true)}
					</Title>
					<Info>Players in the race</Info>
				</Statistic>
				<Statistic>
					<Title>
						<StockCurrency
							$amount={vaultList?.[0].races[0].stakedTokens ?? 0}
							$isAbbr
							$coin="DRB"
						/>
					</Title>
					<Info>Amount of staked tokens</Info>
				</Statistic>
				<Statistic>
					<Title>{vaultList?.[0].races[0].apy}%</Title>
					<Info>APY of the vault</Info>
				</Statistic>
				<Statistic>
					<Title>
						<StockCurrency
							$amount={Number(
								new BigNumber(vaultList?.[0].races[0].totalRewards ?? 0).div(
									10000000
								)
							)}
							$isAbbr
							$coin="DRB"
						/>
					</Title>
					<Info>Total rewards</Info>
				</Statistic>
				<Statistic>
					<Title>-- days</Title>
					<Info>Time to rebalance</Info>
				</Statistic>
			</Container>
		</>
	)
}

const InfoContainer = styled.div``

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
`
const Statistic = styled.div`
	flex: 1 1 31%;
	padding: 1em;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
`
const Title = styled.h4`
	color: ${({ theme }) => theme.style.colorPrimary};
`
const Info = styled.div`
	color: ${({ theme }) => theme.style.colorLabel};
`
export default KeyStatistics
