import ActionButton from '@components/buttons/ActionButton'
import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import { FormInfoRow } from '@components/form/FormElements'
import AkkorokamuiIcon from '@components/icons/AkkorokamuiIcon'
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
					<AkkorokamuiIcon />
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
	width: 8em;
	height: 8em;
	margin: 1em auto;
	padding: 1em;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.style.colorText};
`

export default WalletConnect
