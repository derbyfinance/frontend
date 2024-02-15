import ActionButton from '@components/buttons/ActionButton'
import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import { FormInfoRow } from '@components/form/FormElements'
import LogoIcon from '@components/icons/LogoIcon'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { useCallback } from 'react'
import { styled } from 'styled-components'

const WalletConnect = () => {
	const dispatch = useAppDispatch()

	const handleWalletConnect = useCallback((): void => {
		dispatch(setConnectModalOpenState(true))
	}, [dispatch])

	return (
		<Card type="block">
			<CardContent>
				<LogoBox>
					<LogoIcon />
				</LogoBox>
				<FormInfoRow $align="center">
					<h3>Connect Wallet</h3>
					<p>
						Please connect your wallet to restake, curate and see your
						dashboard.
					</p>
				</FormInfoRow>
				<ActionButton onClick={handleWalletConnect} $isGhost $align="center">
					Connect your wallet
				</ActionButton>
			</CardContent>
		</Card>
	)
}

const LogoBox = styled.div`
	width: 6em;
	height: 6em;
	margin: 1em auto;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.style.colorText};
`

export default WalletConnect
