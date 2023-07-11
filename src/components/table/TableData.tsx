import { styled } from 'styled-components'

export default styled.td<{ $focus?: boolean }>`
	font-family: ${({ theme, $focus }) =>
		$focus ? theme.fonts.slabMedium : 'inherit'};
	font-size: ${({ $focus }) => ($focus ? '1.125em' : 'inherit')};
	height: inherit;

	&:not(:has(> label)) {
		padding: 1.25em 0.5em;
	}

	> label {
		cursor: pointer;
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		padding: 0.5em;
	}

	&[align='right'] > label {
		justify-content: flex-end;
	}

	&[align='center'] > label {
		justify-content: center;
	}
`
