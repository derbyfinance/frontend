import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'
import CloseIcon from '@components/icons/CloseIcon'
import { useState } from 'react'
import { styled } from 'styled-components'

interface Props {
	children: JSX.Element | string
}

export default ({ children }: Props) => {
	const [close, setClose] = useState<boolean>(true)

	const closeModal = () => {
		setClose(true)
	}

	return (
		<Container $isClosed={close} onClick={closeModal}>
			<Modal>
				<ModalCard>
					<ModalCardHeader>
						<CloseButton onClick={closeModal}>
							<CloseIcon />
						</CloseButton>
					</ModalCardHeader>
					<ModalCardContent>{children}</ModalCardContent>
				</ModalCard>
			</Modal>
		</Container>
	)
}

const Container = styled.div<{ $isClosed: boolean }>`
	position: fixed;
	inset: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	backdrop-filter: blur(2px);
	overflow-y: auto;
	opacity: 1;

	transition: opacity 0.5s ease-in-out, z-index 0.5s step-end;

	${({ $isClosed }) =>
		$isClosed &&
		`
		opacity: 0;
		z-index: -10;
		pointer-events: none;
	`}
`
const Modal = styled.div`
	max-width: 25em;

	margin: auto;
	position: absolute;
	left: 0;
	right: 0;
`
const ModalCard = styled(Card)`
	border-radius: ${({ theme }) => theme.style.radius * 3}px;
`
const ModalCardHeader = styled(CardHeader)`
	justify-content: flex-end;
	padding: 1em 1.5em;
`
const ModalCardContent = styled(CardContent)`
	max-height: auto;
	padding: 1em 1.5em;
`
const CloseButton = styled.button`
	cursor: pointer;
	color: ${({ theme }) => theme.style.colorLabel};
`
