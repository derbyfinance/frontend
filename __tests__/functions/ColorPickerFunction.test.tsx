import { Colorpicker } from '@functions/ColorpickerFunction'

describe('ColorPickerFunction', () => {
	it('should convert a name to a color', async () => {
		const names = ['ramon klanke', 'ramon', 'ramon-klanke']
		const result = [
			'hsl(299, 75%, 50%)',
			'hsl(61, 75%, 50%)',
			'hsl(-96, 75%, 50%)'
		]
		names.forEach((name, index) =>
			expect(Colorpicker(name)).toEqual(result[index])
		)
	})
})
