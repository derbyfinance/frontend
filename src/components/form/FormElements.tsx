import { styled } from 'styled-components'

export const FormRow = styled.div`
	display: flex;
	gap: 0.5em;
	justify-content: space-between;
	align-items: end;

	:first-child {
		flex: 1 1 auto;
	}
`
export const SubmitContainer = styled.div`
	margin-top: 2em;
`
export const ErrorCaption = styled.span`
	color: ${({ theme }) => theme.style.colorNegative};
	font-size: 0.75em;
`
