import { ButtonHTMLAttributes } from 'react'

import styled from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	$isCta?: boolean
	$isGhost?: boolean
	$isBlock?: boolean
	children: string | JSX.Element | JSX.Element[]
}

export default ({
	$isCta = false,
	$isGhost = false,
	$isBlock = false,
	children,
	...props
}: Props) => {
	return (
		<Button $isCta={$isCta} $isGhost={$isGhost} $isBlock={$isBlock} {...props}>
			{children}
		</Button>
	)
}

const Button = styled.button<{
	$isCta: boolean
	$isGhost: boolean
	$isBlock: boolean
}>`
	font-family: ${({ theme }) => theme.fonts.slabRegular};
	font-size: 1.25em;
	padding: 0.5em 1em;
	color: ${({ theme }) => theme.style.buttonColor};
	background-image: ${({ theme, $isCta }) =>
		$isCta ? theme.style.buttonColorBg : 'none'};
	background-color: ${({ theme, $isCta }) =>
		$isCta ? 'transparent' : theme.style.buttonColorCtaBg};
	border-radius: ${({ theme }) => theme.style.radius}px;
	display: inline-block;
	cursor: pointer;

	${({ $isGhost }) =>
		$isGhost &&
		`
		color: inherit;
		background: transparent;
		border: 1px solid;
	`}

	${({ $isBlock }) =>
		$isBlock &&
		`
		display: block;
		width: 100%;
	`}
`
