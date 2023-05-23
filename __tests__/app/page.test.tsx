/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import Page from '@app/page'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@theme/ThemeConfig'

describe('Homepage', () => {
	it('should render homepage without a user', () => {
		render(
			<ThemeProvider theme={lightTheme}>
				<Page />
			</ThemeProvider>
		)
		expect(screen).toBeDefined()
	})
})
