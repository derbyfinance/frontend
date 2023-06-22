import axios from "axios"

export const subgraphClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET'
  }
})