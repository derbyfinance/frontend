import { subgraphClient } from '@network/SubgraphClient'

export interface Basket {
	id: string
	vault: {
		id: string
		name: string
		vaultNumber: string
	}
	redeemedRewards: string
	unredeemedRewards: string
	rebalancingPeriod?: string
}

export interface Player {
	player: {
		id: string
		baskets: Basket[]
	}
}

export async function getPlayer(address: string) {
	const data = {
		query: `
      query ($address: String!) {
        player (
          id: $address,    
        ) {
          id,
          baskets {
            id,
            vaultNumber,
            rebalancingPeriod,
            redeemedRewards,
            unredeemedRewards,
          }
        }
      }`,
		variables: { address }
	}
	return subgraphClient.post<Player>(``, data)
}
