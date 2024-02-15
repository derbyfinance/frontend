import { CardType } from '@datatypes/CardType'
import { styled } from 'styled-components'

interface Props {
	type?: CardType
	children: JSX.Element | JSX.Element[] | React.ReactNode
}
const Card = ({ type, children, ...props }: Props) => {
	return (
		<CardComponent $type={type} {...props}>
			{children}
		</CardComponent>
	)
}

const CardComponent = styled.div<{ $type?: CardType }>`
	background-color: ${({ theme }) => theme.style.colorBg};
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	overflow: hidden;

	${({ theme, $type }) =>
		$type === 'info' &&
		`
		background-image: ${theme.style.backgroundInfoGradient};
		color: ${theme.style.buttonColor};
	`}

	${({ theme, $type }) =>
		$type === 'warning' &&
		`
		background-image: ${theme.style.backgroundWarningGradient};
		color: ${theme.style.buttonColor};
	`}

	${({ theme, $type }) =>
		$type === 'cta' &&
		`
		background-image: ${theme.style.backgroundCtaGradient};
		color: ${theme.style.buttonColor};
	`}

	${({ theme, $type }) =>
		$type === 'block' &&
		`
		background-color: ${theme.style.formBg};
		color: ${theme.style.cardTextColor};
		border: none;
	`}

	> div:last-child:not(:first-child) {
		padding-top: 0;
	}
`
export default Card
