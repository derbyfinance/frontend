import Avatar from '@components/Avatar'
import ActionButton from '@components/buttons/ActionButton'
import ArrowDropdownIcon from '@components/icons/ArrowDropdownIcon'
import { MaskCoinAddress } from '@functions/StringFunction'
import { device } from '@helpers/DeviceHelper'
import { useAppSelector } from '@hooks/ReduxStore'
import { getAddressState } from '@store/UserSlice'
import { useCallback, useState } from 'react'
import { styled } from 'styled-components'
import { Hex } from 'viem'
import AccountInfo from './AccountInfo'

const AccountButton = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleOpen = useCallback((isOpen: boolean): void => {
		setIsOpen(!isOpen)
	}, [])

	return (
		<>
			<AccountInfoOverlay $isOpen={isOpen} onClick={() => toggleOpen(isOpen)} />

			<Container>
				<WalletButton $isCta onClick={() => toggleOpen(isOpen)}>
					<Icon>
						<Avatar $isSmall={true} name={address?.toString() ?? ''} />
					</Icon>
					<Address>{address ? MaskCoinAddress(address) : ''}</Address>
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
	position: fixed;
	inset: 0px;
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
const Icon = styled.div`
	display: inline-block;
	margin-right: 0.5em;
	vertical-align: middle;
	font-size: 0.875em;
`
const Address = styled.div`
	display: none;
	@media ${device.laptop} {
		display: inline;
	}
`
export default AccountButton
