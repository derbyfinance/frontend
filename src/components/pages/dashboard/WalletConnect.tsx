import ActionButton from '@components/buttons/ActionButton'
import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import { FormInfoRow } from '@components/form/FormElements'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { useCallback } from 'react'
import { styled } from 'styled-components'

const WalletConnect = () => {
	const dispatch = useAppDispatch()

	const handleWalletConnect = useCallback((): void => {
		dispatch(setConnectModalOpenState(true))
	}, [])

	return (
		<Card type="block">
			<CardContent>
				<Logo />
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

const Logo = styled.div`
	width: 10em;
	height: 10em;
	margin: 2em auto;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.style.colorText};
`

export default WalletConnect
