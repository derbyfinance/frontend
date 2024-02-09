import LogoIcon from '@components/icons/LogoIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import {
	isConnectModalOpenState,
	setConnectModalOpenState
} from '@store/SettingsSlice'
import { isConnectedState } from '@store/UserSlice'
import { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Connector, useConnect } from 'wagmi'
import ConnectorButton from './ConnectorButton'
import Modal from './Modal'

const ConnectWalletModal = () => {
	const dispatch = useAppDispatch()
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const isOpenModal = useAppSelector<boolean | undefined>(
		isConnectModalOpenState
	)

	const { connectors } = useConnect()

	const [connectorList, setConnectorList] = useState<Connector[]>([])

	useEffect(() => {
		setConnectorList([...connectors])
	}, [connectors])

	const closeModal = useCallback((): void => {
		dispatch(setConnectModalOpenState(false))
	}, [])

	return (
		<Modal closeModal={closeModal} isOpen={isOpenModal ?? false}>
			<>
				<Header>
					<LogoBox>
						<LogoIcon />
					</LogoBox>
					<h4>Connect Wallet</h4>
					<p>to start using Akko</p>
					<p>{isConnected ? 'Connected' : 'Not connected'}</p>
				</Header>
				<Content>
					{connectorList.map((connector, index) => (
						<ConnectorButton
							isConnected={isConnected}
							connector={connector}
							key={index}
						/>
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
	margin: 1em auto;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.style.colorText};
`
export default ConnectWalletModal
