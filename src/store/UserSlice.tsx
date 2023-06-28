import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetPlayer } from '@services/UserService'
import { Hex } from 'viem'

export interface UserState {
	staked?: number
	performance?: number
	reward?: number
	amountGold: number
	amountSilver: number
	amountBronze: number

	playerPending: boolean
	playerError: boolean
}

const initialState: UserState = {
	amountGold: 0,
	amountSilver: 0,
	amountBronze: 0,
	playerPending: false,
	playerError: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// LeaderboardList
			.addCase(getPlayerData.pending, (state) => {
				state.playerPending = true
			})
			.addCase(getPlayerData.fulfilled, (state, { payload }) => {
				state.playerPending = false
				state.playerError = false
				console.log('player data', payload)
			})
			.addCase(getPlayerData.rejected, (state) => {
				state.playerPending = false
				state.playerError = true
			})
	}
})

export const getPlayerData = createAsyncThunk(
	'user/player',
	async (address: Hex) => await GetPlayer(address)
)

export const {} = userSlice.actions

export default userSlice.reducer
