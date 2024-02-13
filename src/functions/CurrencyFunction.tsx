export const ToCurrency = (
	amount: number,
	decimals: number | undefined = 2,
	abbr: boolean = false,
	fixedSize: boolean = true,
	currency: 'USD' | 'EUR' = 'USD'
): string => {
	const isNegative: boolean = amount < 0
	let minDecimals: number = fixedSize ? decimals : 0
	let newAmount = amount
	let newAbbr = ''

	if (abbr) {
		minDecimals = 0
		const result = setAbbreviation(amount)
		newAmount = result[0]
		newAbbr = result[1]
	}

	return (
		(isNegative ? '-' : '') +
		newAmount
			.toLocaleString(currency === 'USD' ? 'en-US' : 'nl-NL', {
				minimumFractionDigits: minDecimals,
				maximumFractionDigits: decimals,
				compactDisplay: 'short',
				currencyDisplay: 'narrowSymbol',
				style: 'currency',
				signDisplay: 'never',
				currency: currency
			})
			.replace(/[\u202F\u00A0]/g, '') +
		newAbbr
	)
}

export const ToCoinCurrency = (
	amount: number,
	decimals: number | undefined = 2,
	abbr: boolean = false,
	fixedSize: boolean = true
): string => {
	let minDecimals: number = fixedSize ? decimals : 0
	let newAmount = amount
	let newAbbr = ''

	if (abbr) {
		minDecimals = 0
		const result = setAbbreviation(amount)
		newAmount = result[0]
		newAbbr = result[1]
	}

	return (
		newAmount
			.toLocaleString('en-US', {
				minimumFractionDigits: minDecimals,
				maximumFractionDigits: decimals,
				compactDisplay: 'short',
				currencyDisplay: 'narrowSymbol'
			})
			.replace(/[\u202F\u00A0]/g, '') + newAbbr
	)
}

const setAbbreviation = (amount: number): [number, string] => {
	const isThousand = 1000
	const isMillion = 1000000
	const isBillion = 1000000000

	const amountAbs = Math.abs(amount)

	let newAmount = amount
	let newAbbr = ''

	if (amountAbs >= isThousand && amountAbs < isMillion) {
		newAbbr = '\u00A0K'
		newAmount = amount / isThousand
	} else if (amountAbs >= isMillion && amountAbs < isBillion) {
		newAbbr = '\u00A0M'
		newAmount = amount / isMillion
	} else if (amountAbs >= isBillion) {
		newAbbr = '\u00A0B'
		newAmount = amount / isBillion
	}

	return [newAmount, newAbbr]
}
