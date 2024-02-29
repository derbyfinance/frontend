import SubgraphClient from '@network/SubgraphClient'

import DepositListDtoModel from '@models/dto/DepositListDtoModel'
import { Hex } from 'viem'

export const CalculatePoints = async (
	address: Hex
): Promise<DepositListDtoModel> => {
	const data = {
		query: `query ($address: ID!) {
					deposits(where: {user: $address}) {
						amount
						blockTimestamp
						preferredProtocol
						referral
						user
					}
				}`,
		variables: { address: address.toString() }
	}

	return SubgraphClient.post('', data)
}
