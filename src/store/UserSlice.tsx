import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetPlayer } from '@services/UserService'
import { Hex } from 'viem'

import { AppState } from './Store'
export interface UserState {
	player?: PlayerDtoModel
	playerPending: boolean
	playerError: boolean
	isConnected:boolean
}

const initialState: UserState = {
	playerPending: false,
	playerError: false,
	isConnected: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsConnectedState(state, { payload }) {
			state.isConnected = payload
		},
	},
	extraReducers: (builder) => {
		builder
			// LeaderboardList
			.addCase(getPlayerData.pending, (state) => {
				state.playerPending = true
			})
			.addCase(getPlayerData.fulfilled, (state, { payload }) => {
				state.playerPending = false
				state.playerError = false
				state.player = payload
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

export const getPlayerState = (state: AppState): PlayerDtoModel | undefined =>
	state.user?.player

export const isConnectedState = (state: AppState): boolean => state.user?.isConnected

export const {setIsConnectedState} = userSlice.actions

export default userSlice.reducer
