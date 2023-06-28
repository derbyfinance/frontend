import axios, { AxiosError, AxiosResponse } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import CategoryListResult from '@services/get-category-list.mock.json'
import LeaderboardListResult from '@services/get-leaderboard-list.mock.json'
import NetworkListResult from '@services/get-network-list.mock.json'
import VaultListResult from '@services/get-vault-list.mock.json'
import VaultStatsResult from '@services/get-vault-stats.mock.json'

var mock = new MockAdapter(axios, { delayResponse: 10 })

mock
	.onGet(/\/race\/leaderboard[\w?=]*/)
	.reply((item) => {
		const match = item.url?.match(/\d+$/)
		const amount: number = match ? +match[0] : 0

		let response = LeaderboardListResult

		if (amount > 0) {
			response = { ...response, results: response.results.slice(0, amount) }
		}
		return [200, response]
	})

	.onGet(/\/race\/network[\w?=]*/)
	.reply((item) => {
		const match = item.url?.match(/\d+$/)
		const amount: number = match ? +match[0] : 0

		let response = NetworkListResult

		if (amount > 0) {
			response = { ...response, results: response.results.slice(0, amount) }
		}
		return [200, response]
	})

	.onGet(/\/race\/category*/)
	.reply(() => {
		console.log('category list')
		let response = CategoryListResult

		return [200, response]
	})

	.onGet(/\/vault(\?size=[\d]{1,})*/)
	.reply((item) => {
		const match = item.url?.match(/\d+$/)
		const amount: number = match ? +match[0] : 0

		let response = VaultListResult

		if (amount > 0) {
			response = { ...response, results: response.results.slice(0, amount) }
		}

		return [200, response]
	})

	.onGet(/\/vault\/[\d]$/)
	.reply((item) => {
		const match = item.url?.match(/\d+$/)
		const id: number = match ? +match[0] : 0

		let response = VaultListResult.results.find(({ id }) => id === id)

		return [200, response]
	})

	.onGet(/\/vault\/[\d]+\/stats[?filter=(Y|M|D|ALL)]*/)
	.reply((item) => {
		const match = item.url?.match(/(?<=filter\=)(Y|M|D|ALL)/)
		const filter: string = match ? match[0] : ''

		let response = VaultStatsResult

		if (filter !== '' && filter !== 'ALL') {
			const amount = filter === 'D' ? 2 : filter === 'M' ? 3 : 5
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
