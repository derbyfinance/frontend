import ApiClient from '@network/ApiClient'

import StatsListDtoModel from '@models/dto/StatsListDtoModel'
import { VaultDtoModel } from '@models/dto/VaultDtoModel'
import VaultListDtoModel from '@models/dto/VaultListDtoModel'

export const GetVaultList = (amount?: number): Promise<VaultListDtoModel> => {
	return ApiClient.get(`/vault${amount ? `?size=${amount}` : ''}`)
}

export const GetVault = (id: number): Promise<VaultDtoModel> => {
	return ApiClient.get(`/vault/${id}`)
}

export const GetVaultStats = (id: number): Promise<StatsListDtoModel> => {
	return ApiClient.get(`/vault/${id}/stats`)
}
