import CategoryDtoModel from '@models/dto/CategoryDtoModel'
import { LeaderboardDtoModel } from '@models/dto/LeaderboardDtoModel'
import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import {
	GetCategoryList,
	GetLeaderboardList,
	GetNetworkList
} from '@services/RaceService'
import { AppState } from '@store/Store'

export interface RaceState {
	leaderboardList?: LeaderboardDtoModel[]
	leaderboardListCount?: number
	leaderboardListPending: boolean
	leaderboardListError: boolean

	networkList?: NetworkDtoModel[]
	networkListCount?: number
	networkListPending: boolean
	networkListError: boolean

	categoryList?: CategoryDtoModel[]
	categoryListCount?: number
	categoryListPending: boolean
	categoryListError: boolean

	allocationList?: AllocationRequestModel[]
}

const initialState: RaceState = {
	leaderboardListPending: false,
	leaderboardListError: false,
	networkListPending: false,
	networkListError: false,
	categoryListPending: false,
	categoryListError: false
}

export const raceSlice = createSlice({
	name: 'race',
	initialState,
	reducers: {
		setAllocationListState(state, { payload }) {
			const { allocationList } = current(state)

			const index = allocationList?.findIndex(
				({ network, vault }) =>
					network === payload.network && vault === payload.vault
			)

			if (allocationList === undefined || index === undefined || index <= 0) {
				state.allocationList = [...(allocationList ?? []), payload]
				return
			}

			const update = allocationList[index]
			update.amount += payload.amount
			state.allocationList = [
				...allocationList.slice(0, index),
				update,
				...allocationList.slice(index + 1)
			]
		},
		removeAllocationListState(state, { payload }) {
			const { allocationList } = current(state)

			const items = [...(allocationList ?? [])]
			items.splice(payload, 1)
			state.allocationList = items
		}
	},
	extraReducers: (builder) => {
		builder
			// LeaderboardList
			.addCase(getLeaderboardListData.pending, (state) => {
				state.leaderboardListPending = true
			})
			.addCase(getLeaderboardListData.fulfilled, (state, { payload }) => {
				state.leaderboardListPending = false
				state.leaderboardListError = false
				state.leaderboardList = payload.results
				state.leaderboardListCount = payload.count
			})
			.addCase(getLeaderboardListData.rejected, (state) => {
				state.leaderboardListPending = false
				state.leaderboardListError = true
			})

			// NetworkList
			.addCase(getNetworkListData.pending, (state) => {
				state.networkListPending = true
			})
			.addCase(getNetworkListData.fulfilled, (state, { payload }) => {
				state.networkListPending = false
				state.networkListError = false
				state.networkList = payload.results
				state.networkListCount = payload.count
			})
			.addCase(getNetworkListData.rejected, (state) => {
				state.networkListPending = false
				state.networkListError = true
			})

			// CategoryList
			.addCase(getCategoryListData.pending, (state) => {
				state.categoryListPending = true
			})
			.addCase(getCategoryListData.fulfilled, (state, { payload }) => {
				state.categoryListPending = false
				state.categoryListError = false
				state.categoryList = payload.results
				state.categoryListCount = payload.count
			})
			.addCase(getCategoryListData.rejected, (state) => {
				state.categoryListPending = false
				state.categoryListError = true
			})
	}
})

export const getLeaderboardListData = createAsyncThunk(
	'race/leaderboardList',
	async (size?: number) => await GetLeaderboardList(size)
)

export const getNetworkListData = createAsyncThunk(
	'race/networkList',
	async (size?: number) => await GetNetworkList(size)
)

export const getCategoryListData = createAsyncThunk(
	'race/categoryList',
	async () => await GetCategoryList()
)

export const getLeaderboardListState = (
	state: AppState
): LeaderboardDtoModel[] => state.race.leaderboardList ?? []

export const getLeaderboardListCountState = (state: AppState): number =>
	state.race.leaderboardListCount ?? 0

export const getNetworkListState = (state: AppState): NetworkDtoModel[] =>
	state.race.networkList ?? []

export const getNetworkListCountState = (state: AppState): number =>
	state.race.networkListCount ?? 0

export const getCategoryListState = (state: AppState): CategoryDtoModel[] =>
	state.race.categoryList ?? []

export const getAllocationListState = (
	state: AppState
): AllocationRequestModel[] => state.race.allocationList ?? []

export const { setAllocationListState, removeAllocationListState } =
	raceSlice.actions

export default raceSlice.reducer
