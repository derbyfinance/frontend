import { styled } from 'styled-components'

interface Props {
	isOpen?: boolean
	children: JSX.Element | JSX.Element[] | React.ReactNode
}

export default ({ isOpen = true, children, ...props }: Props) => {
	return (
		<CardContent $isOpen={isOpen} {...props}>
			{children}
		</CardContent>
	)
}

const CardContent = styled.div<{ $isOpen?: boolean }>`
	padding: 2em;
	overflow: hidden;
	transition: max-height 0.4s ease-in-out, padding 0.1s ease-in-out;
	max-height: 100em;

	${({ $isOpen }) =>
		!$isOpen &&
		`
        transition: max-height 0.5s ease-in-out, padding 0.4s step-end;
		max-height: 0;
		padding-top: 0;
        padding-bottom: 0;
	`}
`
