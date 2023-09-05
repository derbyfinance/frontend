import { styled } from 'styled-components'

import ArrowBackwardIcon from '@components/icons/ArrowBackwardIcon'
import ArrowForwardIcon from '@components/icons/ArrowForwardIcon'

interface Props {
	isOpen: boolean
	handle: VoidFunction
}

const ExpandButton = ({ isOpen, handle }: Props) => {
	return (
		<ExpandButtonComponent onClick={handle}>
			<span>{isOpen ? 'Show less' : 'See more'}</span>
			{isOpen ? <ArrowBackwardIcon /> : <ArrowForwardIcon />}
		</ExpandButtonComponent>
	)
}

const ExpandButtonComponent = styled.button`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	font-size: 1.25em;
	color: ${({ theme }) => theme.style.colorLink};
	vertical-align: middle;
	cursor: pointer;

	> svg {
		margin-left: 0.5em;
	}
`
export default ExpandButton