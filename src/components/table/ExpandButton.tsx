import { styled } from 'styled-components'

import ArrowBackwardIcon from '@components/icons/ArrowBackwardIcon'
import ArrowForwardIcon from '@components/icons/ArrowForwardIcon'

interface Props {
	isOpen: boolean
	handle: VoidFunction
}

export default ({ isOpen, handle }: Props) => {
	return (
		<ExpandButton onClick={handle}>
			<span>{isOpen ? 'Show less' : 'See more'}</span>
			{isOpen ? <ArrowBackwardIcon /> : <ArrowForwardIcon />}
		</ExpandButton>
	)
}

const ExpandButton = styled.button`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	font-size: 1.25em;
	color: ${({ theme }) => theme.style.colorLink};
	vertical-align: middle;
	cursor: pointer;

	> svg {
		margin-left: 0.5em;
	}
`
