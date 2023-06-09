import Link from 'next/link'
import { styled } from 'styled-components'

import Logo from '@components/icons/Logo'

import ActionButton from '@components/buttons/ActionButton'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { useAccount } from 'wagmi'
import AccountButton from './AccountButton'
import NavLink from './NavLink'

const Navigation = () => {
	const dispatch = useAppDispatch()
	const { isConnected } = useAccount()

	const handleWalletConnect = (): void => {
		dispatch(setConnectModalOpenState(true))
	}

	return (
		<Navbar>
			<Link href="/">
				<Logo />
			</Link>
			<MenuBar>
				<NavLink href="/">Race</NavLink>
				{/* <NavLink href="/race">Race</NavLink> */}
				<NavLink href="/governance">Governance</NavLink>
				{isConnected ? (
					<AccountButton />
				) : (
					<ActionButton $isCta onClick={handleWalletConnect}>
						Connect your Wallet
					</ActionButton>
				)}
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

export default Navigation
