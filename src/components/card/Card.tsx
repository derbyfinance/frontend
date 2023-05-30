import { styled } from 'styled-components'

interface Props {
	isCta?: boolean
	children: JSX.Element | JSX.Element[] | React.ReactNode
}
export default ({ isCta, children, ...props }: Props) => {
	return (
		<Card $isCta={isCta} {...props}>
			{children}
		</Card>
	)
}

const Card = styled.div<{ $isCta?: boolean }>`
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	margin-top: 2em;
	overflow: hidden;

	${({ theme, $isCta }) =>
		$isCta &&
		`
		background-image: ${theme.style.backgroundCtaGradient};
		color: ${theme.style.buttonColor};
	`}

	> div:last-child:not(:first-child) {
		padding-top: 0;
	}
`
