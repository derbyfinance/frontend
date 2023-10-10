import { AlignType } from '@datatypes/AlignType'
import { ButtonHTMLAttributes } from 'react'

import { css, styled } from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	$isCta?: boolean
	$isGhost?: boolean
	$isBlock?: boolean
	$isLoading?: boolean
	$align?: AlignType
	children: string | JSX.Element | JSX.Element[] | React.ReactNode
}

const ActionButton =({
	$isCta = false,
	$isGhost = false,
	$isBlock = false,
	$isLoading = false,
	$align,
	children,
	...props
}: Props) => {
	return (
		<Button
			$isCta={$isCta}
			$isGhost={$isGhost}
			$isBlock={$isBlock}
			$isLoading={$isLoading}
			$align={$align}
			{...props}>
			{children}
		</Button>
	)
}
export interface ButtonStyleProps {
	$isCta: boolean
	$isGhost: boolean
	$isBlock: boolean
	$isLoading?: boolean
	$align?: AlignType
}

export const ButtonStyle = css<ButtonStyleProps>`
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
	position: relative;

	&:hover {
		filter: hue-rotate(15deg) brightness(105%);
	}

	${({ $isGhost, theme }) =>
		$isGhost &&
		`
		color: inherit;
		background: transparent;
		border: 1px solid;

		&:hover {
			background-color: ${theme.style.colorHover};
			filter: none;
		}

		&:disabled,
		&:[disabled] {
			color: ${theme.style.colorDisabled};
			background: transparent;
		}
	`}

	${({ $isBlock }) =>
		$isBlock &&
		`
		display: block;
		width: 100%;
		text-align: center;
	`}

	${({ $align }) =>
		$align &&
		`
		float: ${$align};
	`}

	${({ $isGhost, theme }) =>
		!$isGhost &&
		`
		&:disabled,
		&[disabled] {
			background: ${theme.style.colorDisabled};
			
		}
	`}
			
	&:disabled,
	&[disabled] {
		opacity: 0.5;
		pointer-events: none;
		cursor: hand;
	}

	transition: padding-right 0.2s ease-in-out;
	
	${({ $isLoading }) => $isLoading && `
		padding-right: 2em;
		pointer-event: none;
		
		&::after{
			content: '';
			position: absolute;
			display: inline-block;
			right: .5em;
			margin: .25em;
			width: 1em;
			height: 1em;
			border-radius: 50%;
			border: 2px solid;
			border-bottom-color: transparent;
			animation: rotating 1s linear infinite;
		}
	`}
`

const Button = styled.button<ButtonStyleProps>`
	${ButtonStyle}
`

export default ActionButton