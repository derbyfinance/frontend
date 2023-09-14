import { AlignType } from '@datatypes/AlignType'
import { styled } from 'styled-components'

export default styled.td<{ $align?: AlignType; $focus?: boolean }>`
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

	${({ $align }) =>
		$align === 'right' &&
		`
		text-align: right;
		> label {
			justify-content: flex-end;
		}
	`}

	${({ $align }) =>
		$align === 'center' &&
		`
		text-align: center;
		> label {
			justify-content: center;
		}
	`}
`
