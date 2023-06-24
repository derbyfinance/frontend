import { AlignType } from '@datatypes/AlignType'
import { styled } from 'styled-components'

interface Props {
	$align?: AlignType
	children: JSX.Element
}

const CardFooter = ({ children, $align = 'left' }: Props) => {
	return <Container $align={$align}>{children}</Container>
}

const Container = styled.div<{ $align: AlignType }>`
	display: flex;
	justify-content: space-between;
	flex-direction: ${({ $align }) =>
		$align === 'right' ? 'row-reverse' : 'row'};
	padding-top: 1em;
`

export default CardFooter
