import { ToCoinCurrency, ToCurrency } from '@functions/CurrencyFunction'
import { ToPercent } from '@functions/NumberFunction'
import ChartDataModel from '@models/internal/ChartDataModel'
import LocalizeModel from '@models/internal/LocalizeModel'
import { ChartData, ChartOptions } from 'chart.js'

export const ChartOptionsSettings = (
	format: LocalizeModel
): ChartOptions<'line'> => {
	return {
		layout: {},
		scales: {
			y: {
				display: false,
				offset: true
			},
			x: {
				offset: true,
				border: {
					display: false,
					dash: [4, 8],
					color: '#E2E2E2'
				},
				ticks: {
					color: '#E2E2E2'
				}
			}
		},
		responsive: true,
		elements: {
			point: {
				radius: 0
			}
		},
		plugins: {
			legend: {
				display: true
			},
			tooltip: {
				backgroundColor: '#160344',
				bodyFont: {
					size: 12
				},
				displayColors: false,
				callbacks: {
					label: function (tooltipItem) {
						return tooltipItem.label
					},
					title: function (tooltipItem) {
						const amount = Number(tooltipItem[0].formattedValue)
						return format.currency === 'EUR' || format.currency === 'USD'
							? ToCurrency(
									amount,
									format.decimals,
									format.abbr,
									true,
									format.currency
							  )
							: format.currency === '%'
							? ToPercent(amount, format.decimals)
							: ToCoinCurrency(amount, format.decimals, format.abbr) +
							  ` ${format.currency}`
					}
				}
			}
		},
		interaction: {
			intersect: false
		}
	}
}

export const ChartDataSettings = (
	data: ChartDataModel[]
): ChartData<'line'> => {
	return {
		labels: data.map(({ label }) => label),
		datasets: [
			{
				label: 'Performance',
				data: data.map(({ data }) => data),
				fill: true,
				tension: 0.3,
				pointHoverBorderWidth: 5,
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#F13ABC',
				pointHoverRadius: 10,

				gradient: {
					borderColor: {
						axis: 'x',
						colors: {
							0: '#FE5E76',
							10: '#39079B'
						}
					},
					backgroundColor: {
						axis: 'y',
						colors: {
							0: '#FFFFFF00',
							1: '#FE5E7620',
							2: '#39079B20'
						}
					}
				}
			}
		]
	}
}
