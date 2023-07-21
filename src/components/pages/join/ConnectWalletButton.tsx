import ActionButton from '@components/buttons/ActionButton'
import { useAppDispatch } from '@hooks/ReduxStore'
import { setConnectModalOpenState } from '@store/SettingsSlice'
import { styled } from 'styled-components'

const AllocateButton = () => {
	const dispatch = useAppDispatch()

	const handleWalletConnect = (): void => {
		dispatch(setConnectModalOpenState(true))
	}

	return (
		<ActionButton $isCta $align="right" onClick={handleWalletConnect}>
			Connect your Wallet
		</ActionButton>
	)
}

const Small = styled.span`
	font-size: 0.75em;
`

export default AllocateButton
