import SubgraphClient from '@network/SubgraphClient'

import { ExchangeDtoModel } from '@models/dto/ExchangeDtoModel'

export const getTotals = async (): Promise<ExchangeDtoModel> => {
	const data = {
				query: `{
						rebases(orderBy: blockNumber, orderDirection: desc) {
							totalEthLocked
							totalAkkEthShares
						}
						}`
	}
	const returnData = await SubgraphClient.post('', data)

	console.log('---return data', returnData)

	// The returnData is ordered by blockNumber in descending order,
	// we want the latest numbers so we take the first element
	const totals: ExchangeDtoModel = {
		totalEthLocked: returnData.data.rebases[0].totalEthLocked,
		totalAkkEthShares: returnData.data.rebases[0].totalAkkEthShares
	}

	return totals
}
