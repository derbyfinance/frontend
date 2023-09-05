import { styled } from 'styled-components'

import EyeClosedIcon from '@components/icons/EyeClosedIcon'
import EyeOpenIcon from '@components/icons/EyeOpenIcon'

interface Props {
	isOpen?: boolean
	handleClick?: VoidFunction
	children: JSX.Element | JSX.Element[] | React.ReactNode
}
const CardHeader = ({ isOpen, handleClick, children, ...props }: Props) => {
	return (
		<CardHeaderComponent {...props}>
			<div>{children}</div>
			{handleClick ? (
				<CollapseButton onClick={handleClick}>
					{isOpen ? <EyeClosedIcon /> : <EyeOpenIcon />}
					<Label>{isOpen ? 'Hide' : 'Show'} explanation</Label>
				</CollapseButton>
			) : null}
		</CardHeaderComponent>
	)
}

const CardHeaderComponent = styled.div`
	padding: 2em;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
`
const CollapseButton = styled.button`
	font-family: ${({ theme }) => theme.fonts.slabRegular};
	color: ${({ theme }) => theme.style.colorLabel};
	font-size: 0.875em;
	vertical-align: middle;
	cursor: pointer;

	svg {
		margin-right: 0.5em;
	}
`
const Label = styled.span``
export default CardHeader