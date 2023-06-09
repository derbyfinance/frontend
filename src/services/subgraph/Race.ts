import { subgraphClient } from '@network/SubgraphClient'

export interface Player {
	player: {
		id: string
		baskets: Basket[]
	}
}
export interface Basket {
	id: string
	vault: Vault
	redeemedRewards: string
	unredeemedRewards: string
	rebalancingPeriod?: string
}

export interface Vault {
	id: string
	name: string
	vaultNumber: string
	protocols: {
		id: string
		name: string
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
            vault {
              id,
              name,
              vaultNumber,
              protocols {
                id,
                name
              }
            },
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
