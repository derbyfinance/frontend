import ApiClient from '@network/ApiClient'

import LeaderboardListDtoModel from '@models/dto/LeaderboardListDtoModel'

export const GetLeaderboard = (
	amount?: number
): Promise<LeaderboardListDtoModel> => {
	return ApiClient.get(`/race/leaderboard${amount ? `?size=${amount}` : ''}`)
}
