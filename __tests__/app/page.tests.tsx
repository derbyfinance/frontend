/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import Page from '@app/page'

describe('Homepage', () => {
	it('should render homepage without a user', () => {
		render(<Page />)
		expect(screen).toBeDefined()
	})
})
