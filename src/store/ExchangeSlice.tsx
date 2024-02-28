import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getTotals } from '@services/ExchangeRateService'
import BigNumber from 'bignumber.js'
import { AppState } from './Store'

export interface ExchangeState {
	exchangePending: boolean
	exchangeError: boolean
	exchangeRate?: number
	tvl?: number
}

const initialState: ExchangeState = {
	exchangePending: false,
	exchangeError: false
}

export const exchangeSlice = createSlice({
	name: 'exchange',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getExchangeData.pending, (state) => {
				state.exchangePending = true
			})
			.addCase(getExchangeData.fulfilled, (state, { payload }) => {
				const rate = Number(
					new BigNumber(Number(payload.totalAkkEthShares)).div(
						1000000000000000000
					) ?? 0
				)
				const tvl = Number(
					new BigNumber(Number(payload.totalEthLocked)).div(
						1000000000000000000
					) ?? 0
				)

				state.exchangePending = false
				state.exchangeError = false
				state.exchangeRate = rate / tvl
				state.tvl = tvl
			})
			.addCase(getExchangeData.rejected, (state) => {
				state.exchangePending = false
				state.exchangeError = true
			})
	}
})

export const getExchangeData = createAsyncThunk(
	'exchange/data',
	async () => (await getTotals()).rebases[0]
)

export const getExchangeRateState = (state: AppState): number | undefined =>
	state.exchange?.exchangeRate

export const getTvlState = (state: AppState): number | undefined =>
	state.exchange?.tvl

export default exchangeSlice.reducer
