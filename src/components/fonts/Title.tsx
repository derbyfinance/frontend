import { styled } from 'styled-components'

export const Title = styled.h2<{
	align?: 'left' | 'center' | 'right'
}>`
	font-family: ${({ theme }) => theme.fonts.slabRegular};
	font-size: 1.25em;

	text-align: ${({ align }) => (align ? align : 'center')};
`
