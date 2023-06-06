import Link, { LinkProps } from 'next/link'
import { styled } from 'styled-components'

interface Props extends LinkProps {
	children: JSX.Element | string
}

export default ({ children, ...props }: Props) => {
	return <TextLink {...props}>{children}</TextLink>
}

const TextLink = styled(Link)`
	color: ${({ theme }) => theme.style.colorCta};
`
