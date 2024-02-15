import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetVaultList } from '@services/VaultService'
import { AppState } from '@store/Store'

export interface VaultState {
	vaultList?: VaultDtoModel[]
	vaultListCount?: number
	vaultListPending: boolean
	vaultListError: boolean
}

const initialState: VaultState = {
	vaultListPending: false,
	vaultListError: false
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
				state.vaultList = payload.vaults
				state.vaultListCount = payload.vaults.length
			})
			.addCase(getVaultListData.rejected, (state) => {
				state.vaultListPending = false
				state.vaultListError = true
			})
	}
})

export const getVaultListData = createAsyncThunk(
	'vault/list',
	async (size: number | undefined) => await GetVaultList(size)
)

export const getVaultListState = (
	state: AppState
): VaultDtoModel[] | undefined => state.vault?.vaultList

export const getVaultListCountState = (state: AppState): number =>
	state.vault?.vaultListCount ?? 0

// export const {} = vaultSlice.actions

export default vaultSlice.reducer
