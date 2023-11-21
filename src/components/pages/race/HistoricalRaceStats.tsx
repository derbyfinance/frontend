import Table from '@components/table/Table'
import { useAppSelector } from '@hooks/ReduxStore'
import { RaceDtoModel, VaultDtoModel } from '@models/dto/PlayerDtoModel'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import { getVaultListState } from '@store/VaultSlice'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import HistoricalRaceRow from './HistoricalRaceRow'

const HistoricalRaceStats = () => {
	const vaultList = useAppSelector<VaultDtoModel[] | undefined>(
		getVaultListState
	)
	const [raceList, setRaceList] = useState<RaceDtoModel[]>()
	const [playerList, setPlayerList] = useState<number[]>()

	useEffect(() => {
		if (vaultList && vaultList.length > 0) {
			setRaceList(vaultList[0].races)
			setPlayerList(vaultList.map(({ baskets }) => baskets.length))
		}
	}, [vaultList])

	const headers: TableHeaderModel[] = [
		{ name: 'Race' },
		{ name: '# Players', align: 'right' },
		{ name: 'Total Staked', align: 'right' },
		{ name: 'APY', align: 'right' },
		{ name: 'Rewards', align: 'right' }
	]

	return (
		<Container>
			<Table headers={headers}>
				{raceList?.map((race, index) => (
					<HistoricalRaceRow
						key={index}
						race={race}
						raceNumber={index + 1}
						players={playerList ? playerList[index] : 0}
					/>
				))}
			</Table>
		</Container>
	)
}

const Container = styled.div``

export default HistoricalRaceStats
