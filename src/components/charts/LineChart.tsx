import { TooltipLine } from '@components/charts/TooltipLinePlugin'
import { Title } from '@components/fonts/Title'
import { ChartFilterType } from '@datatypes/ChartFilterType'
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
import { Dispatch, SetStateAction, useState } from 'react'
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
	title: string
	data: ChartDataModel[]
	format: LocalizeModel
	filter: Dispatch<SetStateAction<ChartFilterType | undefined>>
}

const LineChart = ({ filter, title, data, format }: Props) => {
	const filters: string[] = ['D', 'M', 'Y', 'All']
	const [selected, setSelected] = useState<ChartFilterType>('ALL')

	const handleFilter = (name: string): void => {
		const type = name.toUpperCase() as ChartFilterType
		setSelected(type)
		filter(type)
	}

	return (
		<Container>
			<ChartHeader>
				<Title $align="left">{title}</Title>

				<Filter>
					{filters.map((name, index) => (
						<FilterButton
							key={index}
							onClick={() => handleFilter(name)}
							$isActive={selected === name.toUpperCase()}>
							{name}
						</FilterButton>
					))}
				</Filter>
			</ChartHeader>
			<Line
				options={ChartOptionsSettings(format)}
				data={ChartDataSettings(data)}
			/>
		</Container>
	)
}

const Container = styled.div``

const ChartHeader = styled.div`
	display: flex;
	justify-content: space-between;
`
const Filter = styled.div``

const FilterButton = styled.button<{ $isActive?: boolean }>`
	line-height: 2em;
	padding: 0 1em;
	font-family: ${({ theme }) => theme.fonts.slabLight};
	color: ${({ theme }) => theme.style.colorText};
	border-bottom: 4px solid transparent;
	cursor: pointer;

	${({ $isActive, theme }) =>
		$isActive &&
		`
        font-family: ${theme.fonts.slabMedium};
        border-bottom-color: ${theme.style.colorCta};
    `};
`
export default LineChart
