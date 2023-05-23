import { device, deviceSize } from '@helpers/DeviceHelper'

describe('DeviceHeloer', () => {
	it('should show device size mobile', async () => {
		const test = device.mobile
		expect(test).toEqual(`(min-width: ${deviceSize.mobile})`)
	})

	it('should show device size tablet', async () => {
		const test = device.tablet
		expect(test).toEqual(`(min-width: ${deviceSize.tablet})`)
	})

	it('should show device size laptop', async () => {
		const test = device.laptop
		expect(test).toEqual(`(min-width: ${deviceSize.laptop})`)
	})

	it('should show device size desktop', async () => {
		const test = device.desktop
		expect(test).toEqual(`(min-width: ${deviceSize.desktop})`)
	})
})
