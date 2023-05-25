import { LeaderboardDtoModel } from './LeaderboardDtoModel'

export default interface LeaderboardListDtoModel {
	count: number
	results: LeaderboardDtoModel[]
}
