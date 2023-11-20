import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import { RaceDtoModel } from '@models/dto/PlayerDtoModel'
import { styled } from 'styled-components'

interface Props {
	race: RaceDtoModel
}

const HistoricalRaceRow = ({ race }: Props) => {
	return (
		<TableRow>
			<TableData>Race #</TableData>
			<TableData align="right">---</TableData>
			<TableData align="right">{race.stakedTokens}</TableData>
			<TableData align="right">---</TableData>
			<TableData align="right">{race.totalRewards}</TableData>
		</TableRow>
	)
}

const Container = styled.div``

export default HistoricalRaceRow
