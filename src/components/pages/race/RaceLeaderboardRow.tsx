import { ToCurrency } from '@functions/CurrencyFunction'

import { LeaderboardDtoModel } from '@models/dto/LeaderboardDtoModel'

import Avatar from '@components/Avatar'
import ActionButton from '@components/buttons/ActionButton'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'

interface Props {
	leader: LeaderboardDtoModel
}
const RaceLeaderboardRow = ({ leader }: Props) => {
	const handleFollow = (id: string): void => {
		console.log('error', 'follow', id)
	}

	return (
		<TableRow>
			<TableData>
				<Avatar name={leader.name} />
			</TableData>
			<TableData $align="left" $focus>
				{leader.name}
			</TableData>
			<TableData $align="right">{leader.followers}</TableData>
			<TableData $align="right">
				{ToCurrency(leader.invested, 2, true)}
			</TableData>
			<TableData $align="right">{leader.performance}%</TableData>
			<TableData $align="right">
				<ActionButton $isGhost onClick={() => handleFollow(leader.id)}>
					+Follow
				</ActionButton>
			</TableData>
		</TableRow>
	)
}
export default RaceLeaderboardRow