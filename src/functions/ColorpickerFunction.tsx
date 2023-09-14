export const Colorpicker = (name: string) => {
	let hash = [...name].reduce((acc, char) => (char.charCodeAt(0) + ((acc << 5) - acc)), 0)
	
	const finalHash = hash % 360

	return `hsl(${finalHash}, 75%, 50%)`
}
