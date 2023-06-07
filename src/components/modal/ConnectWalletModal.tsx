import IconSelector from '@components/IconSelector'
import TextLink from '@components/buttons/TextLink'
import ChevronIcon from '@components/icons/ChevronIcon'

import LogoIcon from '@components/icons/LogoIcon'
import { useAppDispatch } from '@hooks/ReduxStore'
import {
	isConnectModalOpenState,
	setConnectModalOpenState
} from '@store/SettingsSlice'
import { AppState } from '@store/Store'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { Connector, useAccount, useConnect, useSignMessage } from 'wagmi'
import Modal from './Modal'

interface Props {}

const ConnectWalletModal = ({}: Props) => {
	const isOpenModal = useSelector<AppState, boolean>(isConnectModalOpenState)
	const dispatch = useAppDispatch()

	const { connectors, connectAsync, isSuccess } = useConnect()
	const { isConnected } = useAccount()
	const { signMessageAsync } = useSignMessage()
	const { push } = useRouter()

	const closeModal = (): void => {
		dispatch(setConnectModalOpenState(false))
	}

	const connectWallet = async (connector: Connector) => {
		console.log(isConnected, isSuccess)
		try {
			const { account, chain } = await connectAsync({ connector })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Modal closeModal={closeModal} isOpen={isOpenModal}>
			<>
				<Header>
					<LogoBox>
						<LogoIcon width="100%" height="100%" />
					</LogoBox>
					<h4>Connect Wallet</h4>
					<p>to start using Derby Finance</p>
				</Header>
				<Content>
					{connectors.map((connector, index) => (
						<ConnectButton
							key={index}
							//disabled={!connector.ready}
							onClick={() => connectWallet(connector)}>
							{IconSelector({ name: connector.name })}
							<Name>{connector.name}</Name>
							<ChevronIcon />
						</ConnectButton>
					))}
				</Content>
				<Footer>
					By connecting I accept Derby's{' '}
					<TextLink href="/terms">terms of Services</TextLink>
				</Footer>
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
`
const Footer = styled.div`
	text-align: center;
	font-size: 0.75em;
	color: ${({ theme }) => theme.style.colorLabel};
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
`
const Name = styled.div`
	text-align: left;
	flex: 1 1 auto;
`

export default ConnectWalletModal
