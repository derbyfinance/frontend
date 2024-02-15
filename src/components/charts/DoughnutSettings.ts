import { ChartData } from 'chart.js'

export const DoughtnutChartSettings = (
	data: ChartData<'doughnut', number[], unknown>
) => ({
	type: 'doughnut',
	data: data,
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				text: 'Chart.js Doughnut Chart'
			}
		}
	}
})
