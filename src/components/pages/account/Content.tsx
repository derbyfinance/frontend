'use client'

import LineChart from '@components/charts/LineChart'
import { formatDate } from '@functions/DateFunction'

import { useAppDispatch } from '@hooks/ReduxStore'
import StatsDtoModel from '@models/dto/StatsDtoModel'
import LocalizeModel from '@models/internal/LocalizeModel'
import { AppState } from '@store/Store'
import { getVaultStatsData, getVaultStatsState } from '@store/VaultSlice'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

const Content = () => {
	const dispatch = useAppDispatch()
	const stats = useSelector<AppState, StatsDtoModel[]>(getVaultStatsState)

	const format: LocalizeModel = {
		decimals: 2,
		currency: 'USD',
		abbr: false
	}

	useEffect(() => {
		dispatch(getVaultStatsData(1))
	}, [])

	return (
		<Container>
			<LineChart
				format={format}
				data={stats.map(({ date, price }) => ({
					label: formatDate(new Date(date), { month: 'short', day: '2-digit' }),
					data: price
				}))}
			/>
		</Container>
	)
}

const Container = styled.div``

export default Content
