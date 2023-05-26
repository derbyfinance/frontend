export const Colorpicker = (name: string) => {
	let hash = 0
	const colorConstant = 131
	const maxSafeValue = 9007199254740991 / colorConstant

	const x = name.split('').map((char) => {
		const temp = char.charCodeAt(0)

		if (hash > maxSafeValue) {
			hash = hash / colorConstant
		}
		hash = temp + ((hash << 5) - hash)
	})

	const finalHash = Math.abs(hash) / 100

	return `hsl(${finalHash}deg, 75%, 50%)`
}
