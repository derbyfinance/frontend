import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'

interface Props extends LinkProps {
	$isCta?: boolean
	$isGhost?: boolean
	children: string | JSX.Element | JSX.Element[]
}

export default ({
	$isCta = false,
	$isGhost = false,
	children,
	...props
}: Props) => {
	return (
		<Button $isCta={$isCta} $isGhost={$isGhost} {...props}>
			{children}
		</Button>
	)
}

const Button = styled(Link)<{ $isCta: boolean; $isGhost: boolean }>`
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

	${({ $isGhost }) =>
		$isGhost &&
		`
		color: inherit;
		background: transparent;
		border: 1px solid;
	`}
`
