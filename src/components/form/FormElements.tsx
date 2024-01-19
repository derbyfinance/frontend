import { AlignType } from '@datatypes/AlignType'
import { styled } from 'styled-components'

export const FormRow = styled.div`
	display: flex;
	gap: 0.5em;
	justify-content: space-between;
	align-items: flex-end;
`
export const SubmitContainer = styled.div`
	margin-top: 2em;
`
export const ErrorCaption = styled.span`
	color: ${({ theme }) => theme.style.colorNegative};
	font-size: 0.75em;
`

export const FormInfoRow = styled.div<{ $align?: AlignType }>`
	display: flex;
	flex-direction: column;

	${({ $align }) =>
		$align === 'center' &&
		`
		text-align: center;
	`}

	& > h3 {
		font-family: ${({ theme }) => theme.fonts.slabMedium};
	}

	& > p {
		font-family: inherit;
		color: inherit;
	}
`
