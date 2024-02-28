import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Hex } from 'viem'

import { CalculatePoints } from '@services/DepositService'
import { AppState } from './Store'

const unixTime = Math.floor(new Date().getTime() / 1000)

export interface UserState {
	depositPending: boolean
	depositError: boolean
	points?: number
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
				const points = payload.reduce(
					(prev, { amount, blockTimestamp }) =>
						prev +
						(BigInt(amount) * (BigInt(unixTime) - BigInt(blockTimestamp))) /
							BigInt(3600) /
							BigInt(10 ** 16),
					0n
				)
				state.depositPending = false
				state.depositError = false
				state.points = Number(points)
			})
			.addCase(getDepositData.rejected, (state) => {
				state.depositPending = false
				state.depositError = true
			})
	}
})

export const getDepositData = createAsyncThunk(
	'user/deposit',
	async (address: Hex) => (await CalculatePoints(address)).deposits
)

export const getPointsState = (state: AppState): number | undefined =>
	state.user?.points

export const isConnectedState = (state: AppState): boolean =>
	state.user?.isConnected

export const getAddressState = (state: AppState): Hex | undefined =>
	state.user?.address

export const { setIsConnectedState, setAddressState } = userSlice.actions

export default userSlice.reducer
