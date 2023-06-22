import ActionButton from '@components/buttons/ActionButton'
import ArrowDropdownIcon from '@components/icons/ArrowDropdownIcon'
import { MaskCoinAddress } from '@functions/StringFunction'
import { useState } from 'react'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'
import AccountInfo from './AccountInfo'

const AccountButton = () => {
	const { address } = useAccount()

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleOpen = (): void => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<AccountInfoOverlay $isOpen={isOpen} onClick={toggleOpen} />

			<Container>
				<WalletButton $isCta onClick={toggleOpen}>
					{MaskCoinAddress(address)}
					<FloatArrowDropdownIcon $isOpen={isOpen} />
				</WalletButton>

				<AccountInfo $isOpen={isOpen} />
			</Container>
		</>
	)
}

const Container = styled.div`
	position: relative;
`
const WalletButton = styled(ActionButton)`
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.style.colorCta};
	border-radius: 1.5em;
	color: inherit;
	position: relative;
	padding-right: 2.25em;
`
const FloatArrowDropdownIcon = styled(ArrowDropdownIcon)<{ $isOpen: boolean }>`
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
	margin: 1em;
	cursor: pointer;
	rotate: 0deg;
	transition: rotate 0.2s ease-in-out;

	${({ $isOpen }) =>
		$isOpen &&
		`
		rotate: 180deg;
	`}
`
const AccountInfoOverlay = styled.div<{ $isOpen: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: none;
	z-index: 1;

	${({ $isOpen }) =>
		$isOpen &&
		`
		display: block;
	`};
`
export default AccountButton
