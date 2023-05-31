import { styled } from 'styled-components'

export default styled.label`
	display: table-Row;
	vertical-align: inherit;
	border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.style.colorHover};
	}
`
