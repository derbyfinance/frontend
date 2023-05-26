import { ToCurrency } from '@functions/CurrencyFunction'

import { LeaderboardDtoModel } from '@models/dto/LeaderboardDtoModel'

import Avatar from '@components/Avatar'
import LinkButton from '@components/LinkButton'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'

interface Props {
	leader: LeaderboardDtoModel
}
export default ({ leader }: Props) => {
	return (
		<TableRow>
			<TableData>
				<Avatar name={leader.name} />
			</TableData>
			<TableData align="left" $focus>
				{leader.name}
			</TableData>
			<TableData align="right">{leader.followers}</TableData>
			<TableData align="right">
				{ToCurrency(leader.invested, 2, true)}
			</TableData>
			<TableData align="right">{leader.performance}%</TableData>
			<TableData align="right">
				<LinkButton $isGhost href="/">
					+Follow
				</LinkButton>
			</TableData>
		</TableRow>
	)
}
