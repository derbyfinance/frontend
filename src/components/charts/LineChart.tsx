import { TooltipLine } from '@components/charts/TooltipLinePlugin'
import ChartDataModel from '@models/internal/ChartDataModel'
import LocalizeModel from '@models/internal/LocalizeModel'
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	LineElement,
	LinearScale,
	PointElement,
	Tooltip
} from 'chart.js'
import gradient from 'chartjs-plugin-gradient'
import { Line } from 'react-chartjs-2'
import { styled } from 'styled-components'
import { ChartDataSettings, ChartOptionsSettings } from './ChartSettings'

ChartJS.register(
	LinearScale,
	CategoryScale,
	PointElement,
	LineElement,
	gradient,
	Filler,
	Tooltip,
	TooltipLine
)

interface Props {
	data: ChartDataModel[]
	format: LocalizeModel
}

const LineChart = ({ data, format }: Props) => {
	return (
		<Line
			options={ChartOptionsSettings(format)}
			data={ChartDataSettings(data)}
		/>
	)
}

const Container = styled.div``

export default LineChart
