import SubgraphClient from '@network/SubgraphClient'

import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { Hex } from 'viem'

export const GetPlayer = async (address: Hex): Promise<PlayerDtoModel> => {
	const data = {
		query: `
      query ($address: ID!) {
        player (
          id: $address,    
        ) {
        id,
        baskets {
            id,
            basketId
            name,
            rebalancingPeriod,
            stakedAmount
            allocations,
            redeemedRewards,
            unredeemedRewards,
            vault {
                id,
                name,
                number,
                chainId,
                category,
                coin,
                protocols {
                    id,
                    name,
                    number,
                    protocolName,
                    protocolVault,
                }
                vaultRewards {
                    rewards
                }
            }
        }
      }
    }
    `,
		variables: { address: address.toString() }
	}

	return SubgraphClient.post(``, data)
}
