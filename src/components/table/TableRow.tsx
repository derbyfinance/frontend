import { styled } from 'styled-components'

export default styled.tr`
	border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};

	&:hover {
		background-color: ${({ theme }) => theme.style.colorHover};
	}
`
