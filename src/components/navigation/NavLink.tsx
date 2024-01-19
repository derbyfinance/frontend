import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { styled } from 'styled-components'

interface Props extends LinkProps {
	disabled?: boolean
	title?: string
	children: string | JSX.Element | JSX.Element[]
}

const NavLink = ({
	children,
	as,
	disabled = false,
	title,
	...props
}: Props) => {
	const pathname = usePathname()

	const isActive = useCallback((): boolean => {
		const urlPath = pathname?.replaceAll('/', '').toLocaleLowerCase()
		const linkPath = props.href
			.toString()
			.replaceAll('/', '')
			.toLocaleLowerCase()

		return (
			(urlPath?.startsWith(linkPath) && linkPath !== '') ||
			(urlPath?.startsWith(linkPath) && urlPath === '')
		)
	}, [pathname])

	return (
		<div title={title}>
			<NavLinkComponent
				$isDisabled={disabled}
				$isActive={isActive()}
				{...props}>
				{children}
			</NavLinkComponent>
		</div>
	)
}

const NavLinkComponent = styled(Link)<{
	$isActive: boolean
	$isDisabled: boolean
}>`
	line-height: 2em;
	padding: 0 1em;
	font-family: ${({ theme }) => theme.fonts.slabLight};
	color: ${({ theme }) => theme.style.colorText};
	font-size: 1.25em;
	border-bottom: 4px solid transparent;

	&:hover {
		border-bottom-color: ${({ theme }) => theme.style.colorCta};
	}

	${({ $isActive, theme }) =>
		$isActive &&
		`
        font-family: ${theme.fonts.slabMedium};
        border-bottom-color: ${theme.style.colorCta};
    `};

	${({ $isDisabled, theme }) =>
		$isDisabled &&
		`
		pointer-events: none;
		color: ${theme.style.colorDisabled};
	`}
`
export default NavLink
