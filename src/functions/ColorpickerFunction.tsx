export const Colorpicker = (name: string) => {
	const hash = [...name].reduce(
		(acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
		0
	)

	const finalHash = hash % 360

	return `hsl(${finalHash}, 75%, 50%)`
}

export const LazyColorPicker: `#${string}`[] = [
	'#fe5e76',
	'#f13abc',
	'#5f08ee',
	'#39079b'
]
