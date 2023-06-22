import ApiClient from '@network/ApiClient'

import LeaderboardListDtoModel from '@models/dto/LeaderboardListDtoModel'
import NetworkListDtoModel from '@models/dto/NetworkListDtoModel'
import { PlayerDtoModel, VaultDto } from '@models/dto/PlayerDtoModel'
import VaultListDtoModel from '@models/dto/VaultListDtoModel'

export const GetLeaderboardList = (
	amount?: number
): Promise<LeaderboardListDtoModel> => {
	return ApiClient.get(`/race/leaderboard${amount ? `?size=${amount}` : ''}`)
}

export const GetNetworkList = (
	amount?: number
): Promise<NetworkListDtoModel> => {
	return ApiClient.get(`/race/network${amount ? `?size=${amount}` : ''}`)
}

export const GetVaultList = (amount?: number): Promise<VaultListDtoModel> => {
	return ApiClient.get(`/race/vault${amount ? `?size=${amount}` : ''}`)
}

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
            vault {
              id,
              name,
              vaultNumber,
              protocols {
                id,
                name,
                network,
                coin,
                protocol,
                protocolNumber,
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

export const getVaults = async () => {
	const data = {
		query: `
      query {
        vaults (first: 10) {
          id,
          name,
          vaultNumber,
          protocols {
            id,
            name,
            network,
            coin,
            protocol,
            protocolNumber
          }
        }
      }`
	}

	return subgraphClient.post<VaultDto[]>(``, data)
}
