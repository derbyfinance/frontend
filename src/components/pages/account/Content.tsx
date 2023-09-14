'use client'

import DoughnutChart from '@components/charts/DoughnutChart'
import LineChart from '@components/charts/LineChart'
import { ChartFilterType } from '@datatypes/ChartFilterType'
import { formatDate } from '@functions/DateFunction'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'

import StatsDtoModel from '@models/dto/StatsDtoModel'
import LocalizeModel from '@models/internal/LocalizeModel'
import { getVaultStatsData, getVaultStatsState } from '@store/VaultSlice'

import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import RaceVaultboard from '../race/RaceVaultboard'
import AllocationBoard from './AllocationBoard'

const Content = () => {
	const dispatch = useAppDispatch()
	const stats = useAppSelector<StatsDtoModel[] | undefined>(getVaultStatsState)
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
			<InfoContainer>
				<h1>Your allocation</h1>
				<p>Who is in the race for you</p>
			</InfoContainer>

			{/* <LineChart
				title="Your historical performance"
				format={format}
				data={
					stats?.map(({ date, price }) => ({
						label: formatDate(new Date(date), {
							month: 'short',
							day: '2-digit'
						}),
						data: price
					})) ?? []
				}
				filter={setFilter}
			/> */}

			<SplitContainer>
				<Chart>
					<DoughnutChart data={[
						{
							label: 'Derby_USDC_LB_10',
							data: 5
						},
						{
							label: 'Derby Derby_USDC_LB_21',
							data: 20
						},
						{
							label: 'Derby_USDC_LB_30',
							data: 15
						}
					]
					} />
				</Chart>
				<AllocationBoard />
			</SplitContainer>
		</Container>
	)
}

const Container = styled.div``
const InfoContainer = styled.div``
const SplitContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 2em;
	align-items: center;
`
const Chart = styled.div`
	flex: 0 1 auto;
	max-width: 12em;
`
export default Content
