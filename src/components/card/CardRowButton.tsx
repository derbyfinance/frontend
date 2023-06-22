import { styled } from 'styled-components'

const CardRowButton = styled.button<{
	$hasHover?: boolean
	$hasBorder?: boolean
	$align?: 'left' | 'center'
	$isFlex?: boolean
}>`
	display: block;
	width: 100%;
	cursor: pointer;
	text-align: center;
	padding: 1em 0.5em;
	text-align: ${({ $align }) => $align ?? 'left'};

	${({ $isFlex }) =>
		$isFlex &&
		`
		display: flex;
		justify-content: space-between;
		gap: 0.5em;
	`}

	${({ $hasBorder, theme }) =>
		($hasBorder || $hasBorder === undefined) &&
		`
		border-bottom: 1px solid ${theme.style.colorBorder};
	`}

	${({ $hasHover, theme }) =>
		($hasHover || $hasHover === undefined) &&
		`
		&:hover {
			background-color: ${theme.style.colorHover};
		}
	`}

	svg {
		margin-right: 0.5em;
	}
`

export default CardRowButton
