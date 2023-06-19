import { AlignType } from '@datatypes/AlignType'
import { styled } from 'styled-components'

export const Title = styled.h2<{
	align?: AlignType
}>`
	font-family: ${({ theme }) => theme.fonts.slabRegular};
	font-size: 1.25em;

	text-align: ${({ align }) => (align ? align : 'center')};
`

export const Small = styled.span`
	font-size: 0.75em;
`
