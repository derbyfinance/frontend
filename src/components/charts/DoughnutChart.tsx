import { LazyColorPicker } from '@functions/ColorpickerFunction'
import ChartDataModel from '@models/internal/ChartDataModel'
import {
	ArcElement,
	Chart,
	ChartData,
	ChartOptions,
	Legend,
	Tooltip
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Legend, Tooltip)

interface Props {
	data: ChartDataModel[]
}

const DoughnutChart = ({ data }: Props) => {
	const chartDataSettings: ChartData<'doughnut', number[], unknown> = {
		labels: data.length > 0 ? data.map(({ label }) => label) : ['Empty'],
		datasets: [
			{
				data: data.length > 0 ? data.map(({ data }) => data) : [100],
				backgroundColor: LazyColorPicker,
				// ['Just', 'Some', 'Random', 'Words', 'To', 'Generate', 'Colors', 'In', 'The', 'Dougnut', 'Chart'].map((name) => Colorpicker(name)),
				// data.length > 0
				// 	? data.map(({ label }) => Colorpicker(label))
				// 	: ['lightGray'],
				hoverOffset: 4
			}
		]
	}

	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		cutout: 75,
		plugins: {
			legend: {
				display: false,
				position: 'bottom'
			}
		}
	}

	return <Doughnut data={chartDataSettings} options={options} />
}

export default DoughnutChart
