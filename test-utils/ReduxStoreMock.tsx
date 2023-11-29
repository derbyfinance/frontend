import { configureStore } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
//import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import ThemeWrapper from '@components/ThemeWrapper'
import WalletConfig from '@components/WalletConfig'
import { AppStore, reducers } from '@store/Store'
import { GlobalStyles } from '@theme/ThemeConfig'
// As a basic setup, import your same slice reducers
//import   from '../features/users/userSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: any //PreloadedState<AppState>
	store?: AppStore
}

export const renderWithProviders = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({ reducer: reducers, preloadedState }),
		...renderOptions
	}: ExtendedRenderOptions = {}
) => {
	const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
		return (
			<Provider store={store}>
				<ThemeWrapper>
					<GlobalStyles />
					<WalletConfig>{children}</WalletConfig>
				</ThemeWrapper>
			</Provider>
		)
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
