import {
	Action,
	ThunkAction,
	combineReducers,
	configureStore
} from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	PersistConfig,
	REGISTER,
	REHYDRATE,
	WebStorage,
	persistReducer
} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import { RaceState, raceSlice } from './RaceSlice'
import { SettingsState, settingsSlice } from './SettingsSlice'

const persistStorage = (): WebStorage => {
	const isServer = typeof window === 'undefined'

	// Returns noop (dummy) storage.
	if (isServer) {
		return {
			getItem() {
				return Promise.resolve(null)
			},
			setItem() {
				return Promise.resolve()
			},
			removeItem() {
				return Promise.resolve()
			}
		}
	}

	return createWebStorage('local')
}

const rootPersistConfig: PersistConfig<any> = {
	key: 'root',
	storage: persistStorage(),
	blacklist: [],
	debug: process.env.NODE_ENV !== 'production'
}

const settingsPersistConfig: PersistConfig<SettingsState> = {
	key: 'settings',
	storage: persistStorage(),
	blacklist: [],
	debug: process.env.NODE_ENV !== 'production'
}

const racePersistConfig: PersistConfig<RaceState> = {
	key: 'race',
	storage: persistStorage(),
	blacklist: [],
	debug: process.env.NODE_ENV !== 'production'
}

export const reducers = combineReducers({
	[settingsSlice.name]: persistReducer(
		settingsPersistConfig,
		settingsSlice.reducer
	),
	[raceSlice.name]: persistReducer(racePersistConfig, raceSlice.reducer)
})

const makeConfiguredStore = (reducer: any) => {
	return configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			}),
		devTools: process.env.NODE_ENV !== 'production'
	})
}

const persistedStoreReducer = persistReducer(rootPersistConfig, reducers)
const pstore = makeConfiguredStore(persistedStoreReducer)
const makeStore = () => pstore

export let persistor = persistStore(pstore)

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>

export const store = makeStore()
