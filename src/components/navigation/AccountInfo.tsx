import Notification from '@components/Notification'
import ActionButton from '@components/buttons/ActionButton'
import CopyIcon from '@components/icons/CopyIcon'
import ExternalIcon from '@components/icons/ExternalIcon'
import { CopyToClipboard } from '@functions/StringFunction'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { useAccount, useDisconnect, useNetwork } from 'wagmi'

interface Props {
	$isOpen: boolean
}

const AccountInfo = ({ $isOpen }: Props) => {
	const { address, connector } = useAccount()
	const { disconnect } = useDisconnect()
	const { chain } = useNetwork()

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

	return (
		<AccountInfoBox $isOpen={$isOpen}>
			<AccountRow $align="center" $hasHover={false}>
				Connected with:
				<br />
				{connector?.name}
				<ConnectorActions>
					<ConnectorButton onClick={handleSwitch}>Switch</ConnectorButton>
					<ConnectorButton onClick={handleDisconnect}>
						Disconnect
					</ConnectorButton>
				</ConnectorActions>
			</AccountRow>
			<AccountRow>
				<ChainStatus $isActive={!chain?.unsupported} />
				{chain?.name}
			</AccountRow>
			<AccountButtonRow onClick={handleCopyAddress}>
				<CopyIcon />
				Copy address
			</AccountButtonRow>
			<AccountLinkRow
				href={`${chain?.blockExplorers?.default.url}/address/${address}` ?? ''}
				target="_blank"
				$hasBorder={false}>
				<ExternalIcon />
				View on {chain?.blockExplorers?.default.name}
			</AccountLinkRow>
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
const AccountRow = styled.div<{
	$hasHover?: boolean
	$hasBorder?: boolean
	$align?: 'left' | 'center'
}>`
	text-align: center;
	padding: 1em 0.5em;
	text-align: ${({ $align }) => $align ?? 'left'};

	${({ $hasBorder, theme }) =>
		($hasBorder || $hasBorder === undefined) &&
		`
		border-bottom: 1px solid ${theme.style.colorBorder};
	`}

	${({ $hasHover, theme }) =>
		($hasHover || $hasHover === undefined) &&
		`
		&:hover {
			background-color: ${theme.style.colorHover};
		}
	`}

	> svg {
		margin-right: 0.5em;
	}
`
const AccountButtonRow = styled.button<{
	$hasHover?: boolean
	$hasBorder?: boolean
	$align?: 'left' | 'center'
}>`
	display: block;
	width: 100%;
	cursor: pointer;
	text-align: center;
	padding: 1em 0.5em;
	text-align: ${({ $align }) => $align ?? 'left'};

	${({ $hasBorder, theme }) =>
		($hasBorder || $hasBorder === undefined) &&
		`
		border-bottom: 1px solid ${theme.style.colorBorder};
	`}

	${({ $hasHover, theme }) =>
		($hasHover || $hasHover === undefined) &&
		`
		&:hover {
			background-color: ${theme.style.colorHover};
		}
	`}

	> svg {
		margin-right: 0.5em;
	}
`
const AccountLinkRow = styled(Link)<{
	$hasHover?: boolean
	$hasBorder?: boolean
	$align?: 'left' | 'center'
}>`
	display: block;
	width: 100%;
	cursor: pointer;
	text-align: center;
	padding: 1em 0.5em;
	text-align: ${({ $align }) => $align ?? 'left'};

	${({ $hasBorder, theme }) =>
		($hasBorder || $hasBorder === undefined) &&
		`
		border-bottom: 1px solid ${theme.style.colorBorder};
	`}

	${({ $hasHover, theme }) =>
		($hasHover || $hasHover === undefined) &&
		`
		&:hover {
			background-color: ${theme.style.colorHover};
		}
	`}
	
	> svg {
		margin-right: 0.5em;
	}
`
const ConnectorActions = styled.div`
	display: flex;
	gap: 0.5em;
	justify-conent: space-between;
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
export default AccountInfo
