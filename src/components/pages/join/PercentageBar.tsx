import { styled } from 'styled-components'

export default () => {
	const list = [20, 40, 60, 80, 100]
	return (
		<Bar>
			{list.map((percentage, index) => (
				<Badge $percentage={percentage} key={index}>
					{percentage == 100 ? 'Max' : `${percentage}%`}
				</Badge>
			))}
		</Bar>
	)
}

const Bar = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.5em;
	margin-top: 0.5em;
`
const Badge = styled.button<{ $percentage: number }>`
	background-color: ${({ theme, $percentage }) =>
		theme.style.colorLink + `${$percentage < 100 ? $percentage : ''}`};
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	color: ${({ theme }) => theme.style.buttonColor};
	border-radius: ${({ theme }) => theme.style.radius}px;
	padding: 0 0.5em;
	cursor: pointer;
`
