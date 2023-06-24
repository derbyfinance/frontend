export const LeadingZero = (number: number, digits: number = 2): string => {
	return number.toLocaleString('en-US', {
		minimumIntegerDigits: digits,
		useGrouping: false
	})
}

export const ToPercent = (
	number: number,
	decimals: number | undefined = 2
): string => {
	let minDecimals: number = decimals

	return number.toLocaleString('en-US', {
		minimumFractionDigits: minDecimals,
		maximumFractionDigits: decimals,
		compactDisplay: 'short',
		currencyDisplay: 'narrowSymbol',
		style: 'percent'
	})
}
