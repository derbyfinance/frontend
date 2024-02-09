import { CoinType } from '@datatypes/CoinType'
import { ColorType } from '@datatypes/ColorType'
import { ToCoinCurrency, ToCurrency } from '@functions/CurrencyFunction'
import { styled } from 'styled-components'
import { Small } from './fonts/Title'

interface Props {
	$amount: number
	$decimals?: number
	$coin?: CoinType
	$isStock?: boolean
	$isAbbr?: boolean
	$color?: ColorType
}

const StockCurrency = ({
	$amount,
	$coin,
	$isStock = false,
	$isAbbr = false,
	$decimals = 2,
	$color
}: Props) => {
	return (
		<Container $isStock={$isStock} $amount={$amount}>
			{$isStock && $amount > 0 ? '+' : null}
			{$coin !== undefined
				? ToCoinCurrency($amount, $decimals, $isAbbr)
				: ToCurrency($amount, $decimals, $isAbbr)}
			{$coin !== undefined ? (
				<CoinCurrency $color={$color}>{$coin}</CoinCurrency>
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
const CoinCurrency = styled(Small)<{ $color: ColorType | undefined }>`
	color: ${({ theme, $color }) =>
		$color ? 'inherit' : theme.style.colorLabel};
	margin-left: 0.25em;
`
export default StockCurrency
