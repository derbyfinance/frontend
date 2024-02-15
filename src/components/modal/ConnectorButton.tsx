import IconSelector from '@components/IconSelector'
import Notification from '@components/Notification'
import ChevronIcon from '@components/icons/ChevronIcon'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { Connector, useConnect } from 'wagmi'

interface Props {
	connector: Connector
	isConnected: boolean
}

const ConnectorButton = ({ connector, isConnected }: Props) => {
	const dispatch = useAppDispatch()
	const { connectAsync } = useConnect()
	const [isReady, setIsReady] = useState<boolean>(false)

	useEffect(() => {
		;(async () => {
			const provider = await connector.getProvider()
			setIsReady(!!provider)
		})()
	}, [connector])

	const closeModal = useCallback((): void => {
		dispatch(setConnectModalOpenState(false))
	}, [dispatch])

	const connectWallet = useCallback(
		async (connector: Connector) => {
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
				const { accounts } = await connectAsync({ connector })

				if (accounts) {
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
		},
		[closeModal, connectAsync, isConnected]
	)

	return (
		isReady && (
			<ConnectButton
				disabled={isConnected || !connector.isAuthorized}
				onClick={() => connectWallet(connector)}>
				{IconSelector({ name: connector.name })}
				<Name>{connector.name}</Name>
				<ChevronIcon />
			</ConnectButton>
		)
	)
}

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

export default ConnectorButton
