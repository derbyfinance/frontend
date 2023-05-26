export const LeadingZero = (number: number, digits: number = 2): string => {
	return number.toLocaleString('en-US', {
		minimumIntegerDigits: digits,
		useGrouping: false
	})
}
