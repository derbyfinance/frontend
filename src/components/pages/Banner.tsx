import { styled } from 'styled-components'

import ActionButton from '@components/buttons/ActionButton'
import { Title } from '@components/fonts/Title'
import LogoIcon from '@components/icons/LogoIcon'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { useCallback } from 'react'

const Banner = () => {
	const dispatch = useAppDispatch()

	const handleWalletConnect = useCallback((): void => {
		dispatch(setConnectModalOpenState(true))
	}, [])

	return (
		<BannerBox>
			<LogoIcon />
			<Title>
				Go ahead, connect your wallet and try our super secure vault.
			</Title>
			<ActionButton onClick={handleWalletConnect}>
				Connect your Wallet
			</ActionButton>
		</BannerBox>
	)
}

const BannerBox = styled.div`
	position: sticky;
	top: 1em;
	background-image: ${({ theme }) => theme.style.backgroundGradient};
	border-radius: ${({ theme }) => theme.style.radius}px;
	color: ${({ theme }) => theme.style.buttonColor};
	padding: 5em 2em;
	display: flex;
	gap: 2em;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`

export default Banner
