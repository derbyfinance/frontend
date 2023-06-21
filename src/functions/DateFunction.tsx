export const formatDate = (
	date: Date = new Date(),
	options?: Intl.DateTimeFormatOptions
): string => {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: '2-digit',
		month: 'short',
		day: 'numeric'
	}

	const dateTimeFormat = new Intl.DateTimeFormat(
		'en-US',
		options ?? defaultOptions
	)
	return dateTimeFormat.format(date)
}
