export const ToPercent = (
	number: number,
	decimals: number | undefined = 2
): string => {
	const minDecimals: number = decimals

	return number.toLocaleString('en-US', {
		minimumFractionDigits: minDecimals,
		maximumFractionDigits: decimals,
		compactDisplay: 'short',
		currencyDisplay: 'narrowSymbol',
		style: 'percent'
	})
}
