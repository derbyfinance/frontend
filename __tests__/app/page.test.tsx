/**
 * @jest-environment jsdom
 */
import { describe, expect } from '@jest/globals'
import { act, render, screen } from '@testing-library/react'

import Page from '@app/page'
import '@inrupt/jest-jsdom-polyfills'
import subgraphClient from '@network/SubgraphClient'
import MockAdapter from 'axios-mock-adapter'

describe('Homepage', () => {
	it('should render homepage without a user', async () => {
		const mock = new MockAdapter(subgraphClient)

		mock.onPost('').reply(200, {
			data: {
				vaults: []
			}
		})

		//await act(async () => {
			render(<Page />)
		//})

		expect(screen).toBeDefined()
	})
})
