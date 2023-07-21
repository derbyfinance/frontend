import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

interface Props extends LinkProps {
	children: string | JSX.Element | JSX.Element[]
}

export default ({ children, as, ...props }: Props) => {
	const pathname = usePathname()

	const isActive = (): boolean => {
		const urlPath = pathname?.replaceAll('/', '').toLocaleLowerCase()
		const linkPath = props.href
			.toString()
			.replaceAll('/', '')
			.toLocaleLowerCase()
		return (
			(urlPath?.startsWith(linkPath) && linkPath !== '') ||
			(urlPath?.startsWith(linkPath) && urlPath === '')
		)
	}

	return (
		<NavLink $isActive={isActive()} {...props}>
			{children}
		</NavLink>
	)
}

const NavLink = styled(Link)<{ $isActive: boolean }>`
	line-height: 2em;
	padding: 0 1em;
	font-family: ${({ theme }) => theme.fonts.slabLight};
	color: ${({ theme }) => theme.style.colorText};
	font-size: 1.25em;
	border-bottom: 4px solid transparent;

	${({ $isActive, theme }) =>
		$isActive &&
		`
        font-family: ${theme.fonts.slabMedium};
        border-bottom-color: ${theme.style.colorCta};
    `};
`
