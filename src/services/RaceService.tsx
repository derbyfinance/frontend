import LeaderboardListDtoModel from '@models/dto/LeaderboardListDtoModel'
import ApiClient from '@network/ApiClient'

export const GetLeaderboard = (): Promise<LeaderboardListDtoModel> => {
	return ApiClient.get('/race/leaderboard')
}
