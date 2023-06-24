import { CoinType } from '@datatypes/CoinType'
import { ToCoinCurrency, ToCurrency } from '@functions/CurrencyFunction'
import { styled } from 'styled-components'
import { Small } from './fonts/Title'

interface Props {
	$amount: number
	$decimals?: number
	$coin?: CoinType
	$isStock?: boolean
}

const StockCurrency = ({
	$amount,
	$coin,
	$isStock = false,
	$decimals = 2
}: Props) => {
	return (
		<Container $isStock={$isStock} $amount={$amount}>
			{$isStock && $amount > 0 ? '+' : null}
			{$coin !== undefined
				? ToCoinCurrency($amount, $decimals)
				: ToCurrency($amount, $decimals)}
			{$coin !== undefined ? (
				<CoinCurrency>{$coin.toUpperCase()}</CoinCurrency>
			) : null}
		</Container>
	)
}

const Container = styled.span<{ $isStock: boolean; $amount: number }>`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	font-size: 1.125em;

	${({ $isStock, $amount, theme }) =>
		$isStock &&
		`
	color:
		${
			$amount > 0
				? theme.style.colorPositive
				: $amount < 0
				? theme.style.colorNegative
				: theme.style.colorNeutral
		};        
    `}
`
const CoinCurrency = styled(Small)`
	color: ${({ theme }) => theme.style.colorLabel};
	margin-left: 0.25em;
`
export default StockCurrency
