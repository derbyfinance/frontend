import { ButtonHTMLAttributes } from 'react'
import { styled } from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive: boolean
	icon?: JSX.Element
}

const ToggleButton = ({ isActive = false, icon, ...props }: Props) => {
	return (
		<Button $isActive={isActive} {...props}>
			<Toggle>{icon}</Toggle>
		</Button>
	)
}

const Button = styled.button<{ $isActive: boolean }>`
	border: 2px solid ${({ theme }) => theme.style.buttonActiveColor};
	background-color: transparent;
	border-radius: 2em;
	font-size: 1.25em;
	width: 2.5em;
	padding: 0;
	cursor: pointer;
	overflow: hidden;

	${({ $isActive, theme }) =>
		$isActive &&
		`
        background-color: ${theme.style.buttonActiveColor};

        > div {
            float: right;
        }
    `}

	&:hover {
		filter: hue-rotate(2deg) brightness(105%);
	}

	&[disabled] {
		cursor: default;
		opacity: 0.75;
		pointer-events: none;
	}
`

const Toggle = styled.div`
	display: block;
	width: 1.25em;
	height: 1.25em;
	line-height: 1.25em;
	background-color: ${({ theme }) => theme.style.colorText};
	border-radius: 0.75em;
	color: ${({ theme }) => theme.style.colorBg};
	padding: 0.25em;
	text-align: center;

	> svg {
		width: 100%;
		height: 100%;
		display: block;
	}
`

export default ToggleButton
