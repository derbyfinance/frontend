import SubgraphClient from '@network/SubgraphClient'

import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { Hex } from 'viem'

export const GetPlayer = async (address: Hex): Promise<PlayerDtoModel> => {
	const data = {
		query: `
      query ($address: String!) {
        player (
          id: $address,    
        ) {
          id,
          baskets {
            id,
            name,
            vault {
              id,
              name,
              category,
              protocol,
              vaultNumber,
              protocols {
                id,
                name,
                network,
                coin,
                protocol
              }
            },
            rebalancingPeriod,
            redeemedRewards,
            unredeemedRewards,
          }
        }
      }`,
		variables: { address: address.toString() }
	}

	return SubgraphClient.post(``, data)
}