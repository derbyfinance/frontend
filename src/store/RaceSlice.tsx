import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { createSlice, current } from '@reduxjs/toolkit'
import { AppState } from '@store/Store'

export interface RaceState {
	allocationList?: AllocationRequestModel[]
	isChanged: boolean
}

const initialState: RaceState = {
	isChanged: false
}

export const raceSlice = createSlice({
	name: 'race',
	initialState,
	reducers: {
		setAllocationListState(state, { payload }) {
			const { allocationList } = current(state)

			const index = allocationList?.findIndex(
				({ vault, protocol }) =>
					protocol === payload.protocol && vault === payload.vault
			)

			state.isChanged = true

			if (allocationList === undefined || index === undefined || index < 0) {
				state.allocationList = [...(allocationList ?? []), payload]

				return
			}

			const amount = allocationList[index].amount
			payload.amount += amount

			state.allocationList = [
				...allocationList.slice(0, index),
				payload,
				...allocationList.slice(index + 1)
			]
		},
		removeAllocationListState(state, { payload }) {
			const { allocationList } = current(state)

			const items = [...(allocationList ?? [])]
			items.splice(payload, 1)
			state.allocationList = items
		},
		clearAllocationListState(state) {
			state.allocationList = []
			state.isChanged = false
		},
		setIsChangedState(state, { payload }) {
			state.isChanged = payload
		}
	},
	extraReducers: () => {}
})

export const getAllocationListState = (
	state: AppState
): AllocationRequestModel[] | undefined => state.race?.allocationList

export const getIsChangedState = (state: AppState) => state.race?.isChanged

export const {
	setIsChangedState,
	setAllocationListState,
	removeAllocationListState,
	clearAllocationListState
} = raceSlice.actions

export default raceSlice.reducer
