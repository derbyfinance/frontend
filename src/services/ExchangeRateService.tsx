import RebaseListDtoModel from '@models/dto/RebaseListDtoModel'
import SubgraphClient from '@network/SubgraphClient'

export const getTotals = async (): Promise<RebaseListDtoModel> => {
	const data = {
		query: `{
			rebases(orderBy: blockNumber, orderDirection: desc) {
				totalEthLocked
				totalAkkEthShares
			}
		}`
	}

	return SubgraphClient.post('', data)
}
