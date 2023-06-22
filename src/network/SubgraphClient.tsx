import axios, { AxiosError, AxiosResponse } from 'axios'

const subgraphClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
	timeout: 1500,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Methods': 'POST,GET'
	}
})

subgraphClient.interceptors.response.use(
	({ data }: AxiosResponse) => {
		return data
	},
	(error: AxiosError) => {
		console.log('Interceptor', 'response', 'error', error)
		Promise.reject(error)
	}
)

export default subgraphClient
