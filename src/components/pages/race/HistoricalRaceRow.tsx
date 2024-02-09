import StockCurrency from '@components/StockCurrency'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import { RaceDtoModel } from '@models/dto/PlayerDtoModel'
import BigNumber from 'bignumber.js'
import { styled } from 'styled-components'

interface Props {
	race: RaceDtoModel
	raceNumber: number
	players: number
}

const HistoricalRaceRow = ({ race, raceNumber, players }: Props) => {
	return (
		<TableRow>
			<TableData>Race {raceNumber}</TableData>
			<TableData align="right">{players}</TableData>
			<TableData align="right">
				<StockCurrency $amount={race.stakedTokens ?? 0} $isAbbr $coin="akETH" />
			</TableData>
			<TableData align="right">{race.apy}%</TableData>
			<TableData align="right">
				<StockCurrency
					$amount={Number(new BigNumber(race.totalRewards ?? 0).div(10000000))}
					$isAbbr
					$coin="akETH"
				/>
			</TableData>
		</TableRow>
	)
}

const Container = styled.div``

export default HistoricalRaceRow
