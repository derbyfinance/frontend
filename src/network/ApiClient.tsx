import axios, { AxiosError, AxiosResponse } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import LeaderboardResult from '@services/get-leaderboard.mock.json'

var mock = new MockAdapter(axios, { delayResponse: 10 })

mock
	.onGet(/\/race\/leaderboard[\w?=]*/)
	.reply((item) => {
		const match = item.url?.match(/\d+$/)
		const amount: number = match ? +match[0] : 0

		let response = LeaderboardResult

		if (amount > 0) {
			response = { ...response, results: response.results.slice(0, amount) }
		}
		return [200, response]
	})
	.onAny()
	.passThrough()

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Methods': 'POST,GET'
	}
})

apiClient.interceptors.response.use(
	({ data }: AxiosResponse) => {
		return data
	},
	(error: AxiosError) => {
		console.log('Interceptor', 'response', 'error', error)
		Promise.reject(error)
	}
)

export default apiClient
