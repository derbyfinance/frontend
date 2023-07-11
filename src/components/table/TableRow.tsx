import { styled } from 'styled-components'

export default styled.tr<{ $isActive?: boolean }>`
	border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.style.colorHover};
	}

	${({ $isActive, theme }) =>
		$isActive &&
		`
		background-color: ${theme.style.colorHover}
	`}
`
