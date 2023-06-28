import ApiClient from '@network/ApiClient'

import { ChartFilterType } from '@datatypes/ChartFilterType'
import { VaultDto } from '@models/dto/PlayerDtoModel'
import StatsListDtoModel from '@models/dto/StatsListDtoModel'
import { VaultDtoModel } from '@models/dto/VaultDtoModel'
import VaultListDtoModel from '@models/dto/VaultListDtoModel'
import SubgraphClient from '@network/SubgraphClient'

export const GetVaultList = (amount?: number): Promise<VaultListDtoModel> => {
	return ApiClient.get(`/vault${amount ? `?size=${amount}` : ''}`)
}

export const GetVault = (id: number): Promise<VaultDtoModel> => {
	return ApiClient.get(`/vault/${id}`)
}

export const GetVaultStats = (
	id: number,
	filter?: ChartFilterType
): Promise<StatsListDtoModel> => {
	return ApiClient.get(`/vault/${id}/stats${filter ? `?filter=${filter}` : ''}`)
}

export const getVaults = async (): Promise<VaultDto[]> => {
	const data = {
		query: `
      query {
        vaults (first: 10) {
          id,
          name,
          vaultNumber,
          protocols {
            name,
            protocolNumber
          }
        }
      }`
	}

	return SubgraphClient.post(``, data)
}
