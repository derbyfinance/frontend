import { styled } from 'styled-components'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, ChartData, ChartOptions, Legend, Tooltip } from 'chart.js'
import ChartDataModel from '@models/internal/ChartDataModel'
import { Colorpicker } from '@functions/ColorpickerFunction'

Chart.register(ArcElement, Legend, Tooltip)

interface Props {
   data: ChartDataModel[]
}

const DoughnutChart = ({ data }: Props) => {
   const chartDataSettings: ChartData<"doughnut", number[], unknown> = {
      labels: data.map(({ label }) => (label)),
      datasets: [{
         data: data.map(({data}) => (data)),
         backgroundColor:
            //['Just', 'Some', 'Random', 'Words', 'To', 'Generate', 'Colors', 'In', 'The', 'Dougnut', 'Chart'].map((name) => Colorpicker(name)),
            data.map(({label})=> Colorpicker(label)),
         hoverOffset: 4
      }]
   }

   const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
         legend: {
            position: 'bottom',
         }
      }
   }

return (
   <Doughnut data={chartDataSettings} options={options} />
   )
}

const Container = styled.div``

export default DoughnutChart