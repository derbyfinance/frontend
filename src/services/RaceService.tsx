import ApiClient from '@network/ApiClient'

import CategoryListDtoModel from '@models/dto/CategoryListDtoModel'
import LeaderboardListDtoModel from '@models/dto/LeaderboardListDtoModel'
import NetworkListDtoModel from '@models/dto/NetworkListDtoModel'

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

export const GetCategoryList = (): Promise<CategoryListDtoModel> => {
	return ApiClient.get(`/race/category`)
}
