import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import StatsDtoModel from '@models/dto/StatsDtoModel'
import VaultStatsRequestModel from '@models/requests/VaultStatsRequestModel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetVault, GetVaultList, GetVaultStats } from '@services/VaultService'
import { AppState } from '@store/Store'

export interface VaultState {
	vaultList?: VaultDtoModel[]
	vaultListCount?: number
	vaultListPending: boolean
	vaultListError: boolean

	vault?: VaultDtoModel
	vaultPending: boolean
	vaultError: boolean

	vaultStats?: StatsDtoModel[]
	vaultStatsCount?: number
	vaultStatsPending: boolean
	vaultStatsError: boolean
}

const initialState: VaultState = {
	vaultListPending: false,
	vaultListError: false,
	vaultPending: false,
	vaultError: false,
	vaultStatsPending: false,
	vaultStatsError: false
}

export const vaultSlice = createSlice({
	name: 'vault',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// VaultList
			.addCase(getVaultListData.pending, (state) => {
				state.vaultListPending = true
			})
			.addCase(getVaultListData.fulfilled, (state, { payload }) => {
				state.vaultListPending = false
				state.vaultListError = false
				state.vaultList = payload.vaults //payload.results
				state.vaultListCount = payload.vaults.length //payload.count
			})
			.addCase(getVaultListData.rejected, (state) => {
				state.vaultListPending = false
				state.vaultListError = true
			})

			// VaultId
			.addCase(getVaultData.pending, (state) => {
				state.vaultPending = true
			})
			.addCase(getVaultData.fulfilled, (state, { payload }) => {
				state.vaultPending = false
				state.vaultError = false
				state.vault = payload
			})
			.addCase(getVaultData.rejected, (state) => {
				state.vaultPending = false
				state.vaultError = true
			})

			// VaultStats
			.addCase(getVaultStatsData.pending, (state) => {
				state.vaultStatsPending = true
			})
			.addCase(getVaultStatsData.fulfilled, (state, { payload }) => {
				state.vaultStatsPending = false
				state.vaultStatsError = false
				state.vaultStats = payload.results
				state.vaultStatsCount = payload.count
			})
			.addCase(getVaultStatsData.rejected, (state) => {
				state.vaultStatsPending = false
				state.vaultStatsError = true
			})
	}
})

export const getVaultListData = createAsyncThunk(
	'vault/list',
	async (size: number | undefined) => await GetVaultList(size)
)

export const getVaultData = createAsyncThunk(
	'vault/id',
	async (id: number) => await GetVault(id)
)

export const getVaultStatsData = createAsyncThunk(
	'vault/id/stats',
	async ({ id, filter }: VaultStatsRequestModel) =>
		await GetVaultStats(id, filter)
)

export const getVaultListState = (
	state: AppState
): VaultDtoModel[] | undefined => state.vault?.vaultList

export const getVaultListCountState = (state: AppState): number =>
	state.vault?.vaultListCount ?? 0

export const getVaultState = (state: AppState): VaultDtoModel | undefined =>
	state.vault?.vault

export const getVaultStatsState = (
	state: AppState
): StatsDtoModel[] | undefined => state.vault?.vaultStats

export const getVaultStatsCountState = (state: AppState): number =>
	state.vault?.vaultStatsCount ?? 0

export const {} = vaultSlice.actions

export default vaultSlice.reducer
