import CreateNftForm from '@components/CreateNftForm'
import LogoIcon from '@components/icons/LogoIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import {
	isCreateNftModalOpenState,
	setCreateNftModalOpenState
} from '@store/SettingsSlice'
import { styled } from 'styled-components'
import Modal from './Modal'
import { useCallback } from 'react'

const CreateNftModal = () => {
	const isOpenModal = useAppSelector<boolean | undefined>(
		isCreateNftModalOpenState
	)
	const dispatch = useAppDispatch()

	const closeModal = useCallback((): void => {
		dispatch(setCreateNftModalOpenState(false))
	}, [])

	return (
		<Modal closeModal={closeModal} isOpen={isOpenModal ?? false}>
			<>
				<Header>
					<LogoBox>
						<LogoIcon width="100%" height="100%" />
					</LogoBox>
					<h4>Create new NFT</h4>
					<p>to start using Derby Finance</p>
				</Header>
				<Content>
					<CreateNftForm closeModal={closeModal} />
				</Content>
				<Footer></Footer>
			</>
		</Modal>
	)
}

const Header = styled.div`
	text-align: center;

	> p {
		font-family: ${({ theme }) => theme.fonts.robotoLight};
		color: inherit;
	}
`
const Content = styled.div``
const Footer = styled.div`
	text-align: center;
	font-size: 0.75em;
	color: ${({ theme }) => theme.style.colorLabel};
`
const LogoBox = styled.div`
	width: 6em;
	height: 6em;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius * 3}px;
	color: ${({ theme }) => theme.style.colorCta};
	padding: 1em;
	margin: 0 auto 1em auto;
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
`

export default CreateNftModal
