import Link from 'next/link'
import { styled } from 'styled-components'

import Logo from '@components/icons/Logo'

import ActionButton from '@components/buttons/ActionButton'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import AccountButton from './AccountButton'
import NavLink from './NavLink'
import { isConnectedState, setIsConnectedState } from '@store/UserSlice'

const Navigation = () => {
	const dispatch = useAppDispatch()
	const account = useAccount()
	const isConnected = useAppSelector<boolean>(isConnectedState)

	useEffect(() => {
		dispatch(setIsConnectedState(account.isConnected))
	 }, [account.isConnected])

	const handleWalletConnect = useCallback((): void => {
		dispatch(setConnectModalOpenState(true))
	}, [])

	return (
		<>
			<a id="top" />
			<Navbar>
				<Link href="/">
					<Logo />
				</Link>
				<MenuBar>
					<NavLink href="/vaults" disabled title="Coming soon">Vaults</NavLink>
					<NavLink href="/">Race</NavLink>
					{isConnected ? <NavLink href="/account">Account</NavLink> :
						<NavLink href="/account" onClick={handleWalletConnect}>Account</NavLink>
					 }
					<NavLink href="/governance" disabled title="Coming soon">Governance</NavLink>
					{isConnected ? (
						<AccountButton />
					) : (
						<ActionButton $isCta onClick={handleWalletConnect}>
							Connect your Wallet
						</ActionButton>
					)}
				</MenuBar>
			</Navbar>
		</>
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
