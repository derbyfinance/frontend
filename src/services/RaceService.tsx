import ApiClient from '@network/ApiClient'

import LeaderboardListDtoModel from '@models/dto/LeaderboardListDtoModel'
import NetworkListDtoModel from '@models/dto/NetworkListDtoModel'
import VaultListDtoModel from '@models/dto/VaultListDtoModel'
import { PlayerDto } from '@models/dto/PlayerDtoModel'
import { subgraphClient } from '@network/SubgraphClient'

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


export const getPlayer = async (address: string) => {
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
  return subgraphClient.post<PlayerDto>(``, data)
}
