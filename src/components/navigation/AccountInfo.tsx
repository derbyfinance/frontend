import Notification from '@components/Notification'
import ActionButton from '@components/buttons/ActionButton'
import CardRow from '@components/card/CardRow'
import CardRowButton from '@components/card/CardRowButton'
import CardRowLink from '@components/card/CardRowLink'
import CopyIcon from '@components/icons/CopyIcon'
import CreateCoinIcon from '@components/icons/CreateCoinIcon'
import ExternalIcon from '@components/icons/ExternalIcon'
import { CopyToClipboard } from '@functions/StringFunction'
import { device } from '@helpers/DeviceHelper'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import useBuyDerbyToken from '@hooks/UseBuyDerbyToken'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { getAddressState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { Hex } from 'viem'
import { useAccount, useDisconnect } from 'wagmi'
import NavMenu from './NavMenu'

interface Props {
	$isOpen: boolean
}

const AccountInfo = ({ $isOpen }: Props) => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const { connector, chain } = useAccount()
	const { disconnect } = useDisconnect()
	const [amount, setAmount] = useState<number>(0)
	const { isSuccessTx, isSuccessPrepare, errorPrepare, errorTx, write, data } =
		useBuyDerbyToken(amount, address)

	const dispatch = useAppDispatch()

	const handleSwitch = (): void => {
		disconnect()
		dispatch(setConnectModalOpenState(true))
	}

	const handleDisconnect = (): void => {
		disconnect()
	}

	const handleCopyAddress = (): void => {
		CopyToClipboard(address ?? '')
		toast.info(
			<Notification
				title="Wallet address"
				notification="Address is copied to your clipboard."
			/>
		)
	}

	const handleDerbyTokens = (): void => {
		setAmount(10)
	}

	useEffect(() => {
		if (errorPrepare || errorTx) {
			toast.error(
				<Notification
					title="Create Derby Tokens"
					notification="Something went wrong during the creation of your Derby Tokens. Please try again."
				/>
			)

			setAmount(0)
		}
	}, [errorTx, errorPrepare])

	useEffect(() => {
		if (isSuccessPrepare && isSuccessTx) {
			toast.success(
				<Notification
					title="Create Derby Tokens"
					notification="Your Derby Tokens for testing purposes are created."
				/>
			)

			setAmount(0)
		}
	}, [isSuccessPrepare, isSuccessTx])

	useEffect(() => {
		if (isSuccessPrepare) {
			console.log('write')
			write?.(data!.request)
		}
	}, [isSuccessPrepare])

	return (
		<AccountInfoBox $isOpen={$isOpen}>
			<CardRow $align="center" $hasHover={false}>
				Connected with:
				<br />
				{connector?.name}
				<ConnectorActions>
					<ConnectorButton onClick={handleSwitch}>Switch</ConnectorButton>
					<ConnectorButton onClick={handleDisconnect}>
						Disconnect
					</ConnectorButton>
				</ConnectorActions>
			</CardRow>
			{Boolean(JSON.parse(process.env.NEXT_PUBLIC_DEBUG ?? 'false')) ? (
				<CardRowButton onClick={handleDerbyTokens}>
					<CreateCoinIcon />
					Create Derby Tokens
				</CardRowButton>
			) : null}
			<CardRow>
				<ChainStatus $isActive={!chain} />
				{chain?.name}
			</CardRow>
			<CardRowButton onClick={handleCopyAddress}>
				<CopyIcon />
				Copy address
			</CardRowButton>
			<CardRowLink
				href={`${chain?.blockExplorers?.default.url}/address/${address}` ?? ''}
				target="_blank"
				$hasBorder={false}>
				<ExternalIcon />
				View on {chain?.blockExplorers?.default.name}
			</CardRowLink>
			<XNavMenu />
		</AccountInfoBox>
	)
}

const AccountInfoBox = styled.div<{ $isOpen: boolean }>`
	background-color: ${({ theme }) => theme.style.colorBg};
	border-radius: ${({ theme }) => theme.style.radius}px;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	margin-top: 0.5em;
	padding: 0.5em;
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
	position: absolute;
	right: 0;
	display: none;
	z-index: 2;
	overflow: hidden;

	${({ $isOpen }) =>
		$isOpen &&
		`
		display: block;
	`};
`
const ConnectorActions = styled.div`
	display: flex;
	gap: 0.5em;
	justify-content: space-between;
	margin-top: 0.5em;
`
const ConnectorButton = styled(ActionButton)`
	background-color: ${({ theme }) => theme.style.colorHover};
	font-family: inherit;
	font-size: inherit;
	color: inherit;
	border-radius: 1.5em;
	min-width: 7em;
`
const ChainStatus = styled.div<{ $isActive: boolean }>`
	width: 0.5em;
	height: 0.5em;
	border-radius: 0.5em;
	background-color: ${({ $isActive }) => ($isActive ? '#00FF38' : 'red')};
	display: inline-block;
	margin: 0 1em 0 0.5em;
`
const XNavMenu = styled(NavMenu)`
	& a {
		display: block;
		border-top: 1px solid ${({ theme }) => theme.style.colorBorder};
		padding: 0.5em;
	}

	@media ${device.laptop} {
		display: none;
	}
`
export default AccountInfo
