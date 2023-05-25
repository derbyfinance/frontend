export const ToCurrency = (
	amount: number,
	decimals: number = 2,
	abbr: boolean = false,
	currency: 'USD' | 'EUR' = 'USD'
): string => {
	const isMillion = 1000000
	const isBillion = 1000000000

	let newAmount = amount
	let newAbbr = ''

	if (abbr) {
		if (amount >= isMillion && amount < isBillion) {
			newAbbr = '\u00A0M'
			newAmount = amount / isMillion
		} else if (amount >= isBillion) {
			newAbbr = '\u00A0B'
			newAmount = amount / isBillion
		}
	}
	return (
		newAmount
			.toLocaleString(currency === 'USD' ? 'en-US' : 'nl-NL', {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
				compactDisplay: 'short',
				currencyDisplay: 'narrowSymbol',
				style: 'currency',
				currency: currency
			})
			.replace(/[\u202F\u00A0]/g, '') + newAbbr
	)
}
