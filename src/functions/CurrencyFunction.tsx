export const ToCurrency = (
	amount: number,
	decimals: number | undefined = 2,
	abbr: boolean = false,
	currency: 'USD' | 'EUR' = 'USD'
): string => {
	const isThousand = 1000
	const isMillion = 1000000
	const isBillion = 1000000000

	let minDecimals: number = decimals
	let newAmount = amount
	let newAbbr = ''

	if (abbr) {
		minDecimals = 0
		if (amount >= isThousand && amount < isMillion) {
			newAbbr = '\u00A0K'
			newAmount = amount / isThousand
		} else if (amount >= isMillion && amount < isBillion) {
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
				minimumFractionDigits: minDecimals,
				maximumFractionDigits: decimals,
				compactDisplay: 'short',
				currencyDisplay: 'narrowSymbol',
				style: 'currency',
				currency: currency
			})
			.replace(/[\u202F\u00A0]/g, '') + newAbbr
	)
}
