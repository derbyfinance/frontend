import { styled } from 'styled-components'

export default styled.td<{ $focus?: boolean }>`
	font-family: ${({ theme, $focus }) =>
		$focus ? theme.fonts.slabMedium : 'inherit'};
	font-size: ${({ $focus }) => ($focus ? '1.25em' : 'inherit')};
	padding: 1.25em 0.5em;
`
