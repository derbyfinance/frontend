import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '@store/Store'

export interface SettingsState {
	isDarkMode?: boolean
	isLargeMode?: boolean
	isConnectModalOpen?: boolean
	isCreateNftModalOpen?: boolean
}

const initialState: SettingsState = {}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setDarkModeState(state, { payload }) {
			state.isDarkMode = payload
		},
		setLargeModeState(state, { payload }) {
			state.isLargeMode = payload
		},
		setConnectModalOpenState(state, { payload }) {
			state.isConnectModalOpen = payload
			if (payload === true) {
				document.body.classList.add('modal-open')
			} else {
				document.body.classList.remove('modal-open')
			}
		},
		setCreateNftModalOpenState(state, { payload }) {
			state.isCreateNftModalOpen = payload
			if (payload === true) {
				document.body.classList.add('modal-open')
			} else {
				document.body.classList.remove('modal-open')
			}
		}
	}
})

export const isDarkModeState = (state: AppState): boolean | undefined =>
	state.settings?.isDarkMode

export const isLargeModeState = (state: AppState): boolean | undefined =>
	state.settings?.isLargeMode

export const isConnectModalOpenState = (state: AppState): boolean | undefined =>
	state.settings?.isConnectModalOpen

export const isCreateNftModalOpenState = (
	state: AppState
): boolean | undefined => state.settings?.isCreateNftModalOpen

export const {
	setDarkModeState,
	setLargeModeState,
	setConnectModalOpenState,
	setCreateNftModalOpenState
} = settingsSlice.actions

export default settingsSlice.reducer
