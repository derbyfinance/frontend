import { ToCoinCurrency, ToCurrency } from '@functions/CurrencyFunction'

describe('CurrencyFunction', () => {
	const decimalList = [
		0, 0.0, 0.1, 0.1009, 0.111, 0.113, 0.116, 0.854, 0.99, 0.947, 0.456
	]
	const positiveList = [
		4, 5, 10, 99, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890
	]
	const positiveDecimalList = positiveList.map(
		(x, index) => decimalList[index] + x
	)
	const negativeDecimalList = positiveList.map(
		(x, index) => -(decimalList[index] + x)
	)
	const totalList = [...positiveDecimalList, ...negativeDecimalList]

	it('should convert number to default currency settings', async () => {
		const positiveResponse: string[] = [
			'$4.00',
			'$5.00',
			'$10.10',
			'$99.10',
			'$1,234.11',
			'$12,345.11',
			'$123,456.12',
			'$1,234,567.85',
			'$12,345,678.99',
			'$123,456,789.95',
			'$1,234,567,890.46'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCurrency(x)).toEqual(response[index])
		)
	})

	it('should convert number to currency with 1 decimal', async () => {
		const positiveResponse: string[] = [
			'$4.0',
			'$5.0',
			'$10.1',
			'$99.1',
			'$1,234.1',
			'$12,345.1',
			'$123,456.1',
			'$1,234,567.9',
			'$12,345,679.0',
			'$123,456,789.9',
			'$1,234,567,890.5'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCurrency(x, 1)).toEqual(response[index])
		)
	})

	it('should convert number to currency with 1 decimal and abbriviation', async () => {
		const positiveResponse: string[] = [
			'$4',
			'$5',
			'$10.1',
			'$99.1',
			'$1.2\u00A0K',
			'$12.3\u00A0K',
			'$123.5\u00A0K',
			'$1.2\u00A0M',
			'$12.3\u00A0M',
			'$123.5\u00A0M',
			'$1.2\u00A0B'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCurrency(x, 1, true)).toEqual(response[index])
		)
	})

	it('should convert number to currency with different symbol', async () => {
		const positiveResponse: string[] = [
			'€4,00',
			'€5,00',
			'€10,10',
			'€99,10',
			'€1.234,11',
			'€12.345,11',
			'€123.456,12',
			'€1.234.567,85',
			'€12.345.678,99',
			'€123.456.789,95',
			'€1.234.567.890,46'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCurrency(x, 2, false, 'EUR')).toEqual(response[index])
		)
	})

	it('should convert number to currency with abbriviation and different symbol', async () => {
		const positiveResponse: string[] = [
			'€4',
			'€5',
			'€10,1',
			'€99,1',
			'€1,23\u00A0K',
			'€12,35\u00A0K',
			'€123,46\u00A0K',
			'€1,23\u00A0M',
			'€12,35\u00A0M',
			'€123,46\u00A0M',
			'€1,23\u00A0B'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCurrency(x, 2, true, 'EUR')).toEqual(response[index])
		)
	})

	it('should convert number to default Coin currency settings', async () => {
		const positiveResponse: string[] = [
			'4.00',
			'5.00',
			'10.10',
			'99.10',
			'1,234.11',
			'12,345.11',
			'123,456.12',
			'1,234,567.85',
			'12,345,678.99',
			'123,456,789.95',
			'1,234,567,890.46'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCoinCurrency(x)).toEqual(response[index])
		)
	})

	it('should convert number to Coin currency with 1 decimal', async () => {
		const positiveResponse: string[] = [
			'4.0',
			'5.0',
			'10.1',
			'99.1',
			'1,234.1',
			'12,345.1',
			'123,456.1',
			'1,234,567.9',
			'12,345,679.0',
			'123,456,789.9',
			'1,234,567,890.5'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCoinCurrency(x, 1)).toEqual(response[index])
		)
	})

	it('should convert number to Coin currency with 1 decimal and abbriviation', async () => {
		const positiveResponse: string[] = [
			'4',
			'5',
			'10.1',
			'99.1',
			'1.2\u00A0K',
			'12.3\u00A0K',
			'123.5\u00A0K',
			'1.2\u00A0M',
			'12.3\u00A0M',
			'123.5\u00A0M',
			'1.2\u00A0B'
		]
		const negaviveResponse: string[] = positiveResponse.map((x) => `-${x}`)
		const response = [...positiveResponse, ...negaviveResponse]

		totalList.forEach((x, index) =>
			expect(ToCoinCurrency(x, 1, true)).toEqual(response[index])
		)
	})
})
