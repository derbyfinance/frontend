import IconSelector from '@components/IconSelector'
import ChevronIcon from '@components/icons/ChevronIcon'

import Notification from '@components/Notification'
import LogoIcon from '@components/icons/LogoIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import {
	isConnectModalOpenState,
	setConnectModalOpenState
} from '@store/SettingsSlice'
import { isConnectedState } from '@store/UserSlice'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { Connector, useConnect } from 'wagmi'
import Modal from './Modal'

const ConnectWalletModal = () => {
	const dispatch = useAppDispatch()
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const isOpenModal = useAppSelector<boolean | undefined>(
		isConnectModalOpenState
	)

	const { connectors, connectAsync } = useConnect()

	const closeModal = useCallback((): void => {
		dispatch(setConnectModalOpenState(false))
	}, [])

	const connectWallet = useCallback(async (connector: Connector) => {
		console.log(connectors)
		if (isConnected) {
			toast.info(
				<Notification
					title="Wallet connection"
					notification="Already connected to a wallet"
				/>
			)
			return
		}

		try {
			const { account } = await connectAsync({ connector })

			if (account) {
				toast.success(
					<Notification
						title="Wallet connection"
						notification="Your wallet is connected!"
					/>
				)

				closeModal()
			}
		} catch (e) {
			toast.error(
				<Notification
					title="Wallet connection"
					notification="Something went wrong during wallet connection. Please try again or contact us."
				/>
			)
			console.log(e)
		}
	}, [])

	return (
		<Modal closeModal={closeModal} isOpen={isOpenModal ?? false}>
			<>
				<Header>
					<LogoBox>
						<LogoIcon width="100%" height="100%" />
					</LogoBox>
					<h4>Connect Wallet</h4>
					<p>to start using Derby Finance</p>
					<p>{isConnected ? 'Connected' : 'Not connected'}</p>
				</Header>
				<Content>
					{connectors.map((connector, index) => (
						<ConnectButton
							key={index}
							disabled={isConnected || !connector.ready}
							onClick={() => connectWallet(connector)}>
							{IconSelector({ name: connector.name })}
							<Name>{connector.name}</Name>
							<ChevronIcon />
						</ConnectButton>
					))}
				</Content>
			</>
		</Modal>
	)
}

const Header = styled.div`
	text-align: center;

	> p {
		font-family: ${({ theme }) => theme.fonts.robotoLight};
		color: inherit;
	}
`
const Content = styled.div`
	text-align: center;

	> button:last-child {
		border-bottom: none;
	}
`
const LogoBox = styled.div`
	width: 6em;
	height: 6em;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius * 3}px;
	color: ${({ theme }) => theme.style.colorCta};
	padding: 1em;
	margin: 0 auto 1em auto;
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
`
const ConnectButton = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
	width: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};
	padding: 1em;
	font-size: 1.125em;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.style.colorHover};
	}

	&:disabled,
	&[disabled] {
		opacity: 0.5;
		pointer-events: none;
		cursor: hand;

		&:hover {
			background-color: inherit;
		}
	}
`
const Name = styled.div`
	text-align: left;
	flex: 1 1 auto;
`

export default ConnectWalletModal
