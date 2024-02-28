import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Hex } from 'viem'

import { CalculatePoints } from '@services/DepositService'
import { AppState } from './Store'

export interface UserState {
	depositPending: boolean
	depositError: boolean
	points?: bigint
	isConnected: boolean
	address?: Hex
}

const initialState: UserState = {
	depositPending: false,
	depositError: false,
	isConnected: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsConnectedState(state, { payload }) {
			state.isConnected = payload
		},
		setAddressState(state, { payload }) {
			state.address = payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDepositData.pending, (state) => {
				state.depositPending = true
			})
			.addCase(getDepositData.fulfilled, (state, { payload }) => {
				state.depositPending = false
				state.depositError = false
				state.points = payload.points
			})
			.addCase(getDepositData.rejected, (state) => {
				state.depositPending = false
				state.depositError = true
			})
	}
})

export const getDepositData = createAsyncThunk(
	'user/deposit',
	async (address: Hex) => await CalculatePoints(address)
)

export const getPointsState = (state: AppState): bigint | undefined =>
	state.user?.points

export const isConnectedState = (state: AppState): boolean =>
	state.user?.isConnected

export const getAddressState = (state: AppState): Hex | undefined =>
	state.user?.address

export const { setIsConnectedState, setAddressState } = userSlice.actions

export default userSlice.reducer
