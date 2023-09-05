import Link, { LinkProps } from 'next/link'
import { styled } from 'styled-components'

interface Props extends LinkProps {
	children: JSX.Element | string
}

const TextLink = ({ children, as, ...props }: Props) => {
	return <TextLinkComponent {...props}>{children}</TextLinkComponent>
}

const TextLinkComponent = styled(Link)`
	color: ${({ theme }) => theme.style.colorCta};
`
export default TextLink