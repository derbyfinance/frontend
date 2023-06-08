import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'
import { createSlice, current } from '@reduxjs/toolkit'
import { AppState } from '@store/Store'

export interface RaceState {
	allocationList?: AllocationRequestModel[]
}

const initialState: RaceState = {}

export const raceSlice = createSlice({
	name: 'race',
	initialState,
	reducers: {
		setAllocationState(state, { payload }) {
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
		removeAllocationState(state, { payload }) {
			const { allocationList } = current(state)

			const items = [...(allocationList ?? [])]
			items.splice(payload, 1)
			state.allocationList = items
		}
	}
})

export const getAllocationState = (state: AppState): AllocationRequestModel[] =>
	state.race.allocationList ?? []

export const { setAllocationState, removeAllocationState } = raceSlice.actions

export default raceSlice.reducer
