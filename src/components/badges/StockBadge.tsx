import StockDownIcon from '@components/icons/StockDownIcon'
import StockNeutralIcon from '@components/icons/StockNeutralIcon'
import StockUpIcon from '@components/icons/StockUpIcon'
import { ToPercent } from '@functions/NumberFunction'
import { styled } from 'styled-components'

interface Props {
	$amount: number
}

const StockBadge = ({ $amount }: Props) => {
	return (
		<Badge $amount={$amount}>
			<span>{ToPercent($amount, 1)}</span>
			{$amount > 0 ? (
				<StockUpIcon />
			) : $amount < 0 ? (
				<StockDownIcon />
			) : (
				<StockNeutralIcon />
			)}
		</Badge>
	)
}

const Badge = styled.div<{ $amount: number }>`
	display: inline-block;
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	color: ${({ theme }) => theme.style.buttonColor};
	background-color: ${({ $amount, theme }) =>
		$amount > 0
			? theme.style.colorPositive
			: $amount < 0
			? theme.style.colorNegative
			: theme.style.colorNeutral};
	padding: 0 0.5em;
	border-radius: ${({ theme }) => theme.style.radius}px;

	> span {
		vertical-align: middle;
	}

	> svg {
		margin: 0 0 0 0.25em;
	}
`

export default StockBadge
