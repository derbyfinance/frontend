'use client'

import LineChart from '@components/charts/LineChart'
import { ChartFilterType } from '@datatypes/ChartFilterType'
import { formatDate } from '@functions/DateFunction'

import { useAppDispatch } from '@hooks/ReduxStore'
import StatsDtoModel from '@models/dto/StatsDtoModel'
import LocalizeModel from '@models/internal/LocalizeModel'
import { AppState } from '@store/Store'
import { getVaultStatsData, getVaultStatsState } from '@store/VaultSlice'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

const Content = () => {
	const dispatch = useAppDispatch()
	const stats = useSelector<AppState, StatsDtoModel[]>(getVaultStatsState)
	const [filter, setFilter] = useState<ChartFilterType>()

	const format: LocalizeModel = {
		decimals: 2,
		currency: 'USD',
		abbr: false
	}

	useEffect(() => {
		dispatch(getVaultStatsData({ id: 1, filter: filter }))
	}, [filter])

	return (
		<Container>
			<LineChart
				title="Your historical performance"
				format={format}
				data={stats.map(({ date, price }) => ({
					label: formatDate(new Date(date), { month: 'short', day: '2-digit' }),
					data: price
				}))}
				filter={setFilter}
			/>
		</Container>
	)
}

const Container = styled.div``

export default Content
