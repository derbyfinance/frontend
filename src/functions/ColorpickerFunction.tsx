export const Colorpicker = (name: string) => {
	let hash = 0
	name.split('').forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})

	const finalHash = hash % 360

	return `hsl(${finalHash}deg, 75%, 50%)`
}
