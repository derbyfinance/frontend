import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'
import CloseIcon from '@components/icons/CloseIcon'
import { MouseEvent, useCallback } from 'react'
import { styled } from 'styled-components'

interface Props {
	children: JSX.Element | string
	isOpen: boolean
	closeModal: VoidFunction
}

const Modal = ({ children, isOpen, closeModal }: Props) => {
	const stopPropagation = useCallback((e: MouseEvent<HTMLDivElement>): void => {
		e.stopPropagation()
	}, [])

	return (
		<Container $isOpen={isOpen} onClick={closeModal}>
			<ModalBox onClick={stopPropagation}>
				<ModalCard>
					<ModalCardHeader>
						<CloseButton onClick={closeModal}>
							<CloseIcon />
						</CloseButton>
					</ModalCardHeader>
					<ModalCardContent>{children}</ModalCardContent>
				</ModalCard>
			</ModalBox>
		</Container>
	)
}

const Container = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	inset: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(2px);
	padding-top: 4em;
	scrollbar-gutter: stable;

	opacity: 0;
	z-index: -10;
	pointer-events: none;
	overflow-y: hidden;
	transition: opacity 0.5s ease-in-out, z-index 0.5s step-end,
		overflow-y 0.5s step-end;

	${({ $isOpen }) =>
		$isOpen &&
		`
		opacity: 1;
		z-index: 89;
		pointer-events: auto;
		overflow-y: auto;
		transition: opacity 0.5s ease-in-out, z-index 0.5s step-start;
	`}
`
const ModalBox = styled.div`
	max-width: 25em;
	margin: auto;
	position: absolute;
	left: 0;
	right: 0;
`
const ModalCard = styled(Card)`
	border-radius: ${({ theme }) => (theme.style.radius ?? 0) * 3}px;
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

export default Modal
