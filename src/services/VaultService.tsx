import ApiClient from '@network/ApiClient'

import { ChartFilterType } from '@datatypes/ChartFilterType'
import StatsListDtoModel from '@models/dto/StatsListDtoModel'

import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import VaultListDtoModel from '@models/dto/VaultListDtoModel'
import SubgraphClient from '@network/SubgraphClient'

export const GetVault = (id: number): Promise<VaultDtoModel> => {
	return ApiClient.get(`/vault/${id}`)
}

export const GetVaultStats = (
	id: number,
	filter?: ChartFilterType
): Promise<StatsListDtoModel> => {
	return ApiClient.get(`/vault/${id}/stats${filter ? `?filter=${filter}` : ''}`)
}

export const GetVaultList = async (
	amount?: number
): Promise<VaultListDtoModel> => {
	const data = {
		query: `
      query {
        vaults(first: $amount) {
          id,
          name,
          number,
          chainId,
          coin,
          category,
          baskets {
            id,
            name,
            vault,
            stakedAmount,
            redeemedRewards,
            unredeemedRewards,
            allocations
          },
          exchangeRates(first: 2) {
            id,
            exchangeRate
          }
          races {
            stakedTokens,
            totalRewards 
          }
          protocols {
              id,
              protocolName,
              protocolVault
              number,
              underlying,
              protocolLPToken,
              govToken,
          }
        }
      }`,
		variables: { amount: amount ?? 5 }
	}

	return SubgraphClient.post(``, data)
}
