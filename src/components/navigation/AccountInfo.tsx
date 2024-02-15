import Notification from '@components/Notification'
import ActionButton from '@components/buttons/ActionButton'
import CardRow from '@components/card/CardRow'
import CardRowButton from '@components/card/CardRowButton'
import CardRowLink from '@components/card/CardRowLink'
import ToggleButton from '@components/form/ToggleButton'
import CopyIcon from '@components/icons/CopyIcon'
import DarkModeIcon from '@components/icons/DarkModeIcon'
import ExternalIcon from '@components/icons/ExternalIcon'
import FontSizeIcon from '@components/icons/FontSizeIcon'
import LightModeIcon from '@components/icons/LightModeIcon'
import { CopyToClipboard } from '@functions/StringFunction'
import { device } from '@helpers/DeviceHelper'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import {
	isDarkModeState,
	isLargeModeState,
	setConnectModalOpenState,
	setDarkModeState,
	setLargeModeState
} from '@store/SettingsSlice'
import { getAddressState } from '@store/UserSlice'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { Hex } from 'viem'
import { useAccount, useDisconnect } from 'wagmi'
import CreateTestTokens from './CreateTestTokens'
import NavMenu from './NavMenu'

interface Props {
	$isOpen: boolean
}

const AccountInfo = ({ $isOpen }: Props) => {
	const isDarkMode = useAppSelector<boolean>(isDarkModeState)
	const isLargeMode = useAppSelector<boolean>(isLargeModeState)
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const { connector, chain } = useAccount()
	const { disconnect } = useDisconnect()

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

	const toggleDarkTheme = (): void => {
		dispatch(setDarkModeState(!isDarkMode))
	}

	const toggleLargeTheme = (): void => {
		dispatch(setLargeModeState(!isLargeMode))
	}

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
			{JSON.parse(process.env.NEXT_PUBLIC_DEBUG ?? 'false') ? (
				<CreateTestTokens />
			) : null}
			<CardRow>
				<ChainStatus $isActive={chain !== undefined} />
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

			<ToggleActions>
				<ToggleButton
					isActive={isDarkMode}
					onClick={toggleDarkTheme}
					icon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
					title="Change color them of the website"
				/>
				<ToggleButton
					className="large"
					isActive={isLargeMode}
					onClick={toggleLargeTheme}
					icon={<FontSizeIcon />}
					title="Change color them of the website"
				/>
			</ToggleActions>
			<XNavMenu />
		</AccountInfoBox>
	)
}

const AccountInfoBox = styled.div<{ $isOpen: boolean }>`
	background-color: ${({ theme }) => theme.style.cardColorBg};
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
const ToggleActions = styled.div`
	display: flex;
	gap: 0.5em;
	justify-content: space-around;
	padding-bottom: 1em;
	margin-top: 0.5em;

	& > .large {
		display: none;
	}

	@media ${device.laptop} {
		& > .large {
			display: inline-block;
		}
	}
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
