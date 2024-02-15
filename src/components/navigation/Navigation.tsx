import Link from 'next/link'
import { styled } from 'styled-components'

import ActionButton from '@components/buttons/ActionButton'
import Logo from '@components/icons/Logo'
import { device } from '@helpers/DeviceHelper'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import {
	getPlayerData,
	isConnectedState,
	setAddressState,
	setIsConnectedState
} from '@store/UserSlice'
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import AccountButton from './AccountButton'
import NavMenu from './NavMenu'

const Navigation = () => {
	const dispatch = useAppDispatch()
	const { isConnected, address } = useAccount()
	const isConnectedUser = useAppSelector<boolean>(isConnectedState)

	useEffect(() => {
		dispatch(setIsConnectedState(isConnected))
		dispatch(setAddressState(address))
		if (address !== undefined) {
			dispatch(getPlayerData(address))
		}
	}, [isConnected, address, dispatch])

	const handleWalletConnect = useCallback((): void => {
		dispatch(setConnectModalOpenState(true))
	}, [dispatch])

	return (
		<>
			<a id="top" />
			<Navbar>
				<Link href="/">
					<LogoWrapper>
						<Logo />
					</LogoWrapper>
				</Link>
				<MenuBar>
					<XNavMenu />
					{isConnectedUser ? (
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
const LogoWrapper = styled.div`
	width: 5em;
	overflow: hidden;
	@media ${device.laptop} {
		width: 8em;
	}
`
const XNavMenu = styled(NavMenu)`
	display: none;
	@media ${device.laptop} {
		display: flex;
		justify-content: space-between;
		gap: 0.5em;
		flex-wrap: nowrap;
		align-items: center;
	}
`
export default Navigation
