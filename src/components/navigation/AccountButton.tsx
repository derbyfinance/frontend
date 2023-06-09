import ActionButton from '@components/buttons/ActionButton'
import { MaskCoinAddress } from '@functions/StringFunction'
import { styled } from 'styled-components'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'

const AccountButton = () => {
	const { address } = useAccount()
	const { data: ensName } = useEnsName({
		address: address
	})
	const avatar = useEnsAvatar({ name: ensName })

	console.log(avatar)
	return <WalletButton $isCta>{MaskCoinAddress(address)}</WalletButton>
}

const WalletButton = styled(ActionButton)`
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.style.colorCta};
	border-radius: 1.5em;
	color: inherit;
`

export default AccountButton
