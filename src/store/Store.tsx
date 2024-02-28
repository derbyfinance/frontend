import {
	Action,
	ThunkAction,
	combineReducers,
	configureStore
} from '@reduxjs/toolkit'
import { settingsSlice } from './SettingsSlice'
import { userSlice } from './UserSlice'

export const reducers = combineReducers({
	[settingsSlice.name]: settingsSlice.reducer,
	[userSlice.name]: userSlice.reducer
})

export const rootStore = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}),
	devTools: process.env.NODE_ENV !== 'production'
})

const makeStore = () => rootStore

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>

export const store = makeStore()
