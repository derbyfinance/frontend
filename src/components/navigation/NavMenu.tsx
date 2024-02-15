import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { isConnectedState } from '@store/UserSlice'
import { useCallback } from 'react'
import NavLink from './NavLink'

interface Props {}

const NavMenu = ({ ...props }: Props) => {
	const dispatch = useAppDispatch()
	const isConnectedUser = useAppSelector<boolean>(isConnectedState)

	const handleWalletConnect = useCallback((): void => {
		dispatch(setConnectModalOpenState(true))
	}, [dispatch])

	return (
		<div {...props}>
			<NavLink href="/">Restake</NavLink>
			{isConnectedUser ? (
				<NavLink href="/dashboard">Dashboard</NavLink>
			) : (
				<NavLink href="/dashboard" onClick={handleWalletConnect}>
					Dashboard
				</NavLink>
			)}
		</div>
	)
}

export default NavMenu
