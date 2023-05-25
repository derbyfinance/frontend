import Logo from '@components/icons/Logo'
import Link from 'next/link'
import { styled } from 'styled-components'
import NavLink from './NavLink'
import LinkButton from '@components/LinkButton'

export default () => {
	return (
		<Navbar>
			<Link href="/">
				<Logo />
			</Link>
			<MenuBar>
				<NavLink href="/">Vault</NavLink>
				<NavLink href="/race">Race</NavLink>
				<NavLink href="/governance">Governance</NavLink>
				<LinkButton $isCta href="/">
					Connect your Wallet
				</LinkButton>
			</MenuBar>
		</Navbar>
	)
}

const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1em;
	flex-wrap: nowrap;
	margin: 1em 0;
`

const MenuBar = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 0.5em;
	flex-wrap: nowrap;
	align-items: center;
`
