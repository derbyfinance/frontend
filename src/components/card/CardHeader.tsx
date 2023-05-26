import { styled } from 'styled-components'

import EyeClosedIcon from '@components/icons/EyeClosedIcon'
import EyeOpenIcon from '@components/icons/EyeOpenIcon'

interface Props {
	isOpen?: boolean
	handleClick: VoidFunction
	children: JSX.Element | JSX.Element[] | React.ReactNode
}
export default ({ isOpen, handleClick, children }: Props) => {
	return (
		<CardHeader>
			{children}
			<CollapseButton onClick={handleClick}>
				{isOpen ? <EyeClosedIcon /> : <EyeOpenIcon />}
				<Label>{isOpen ? 'Hide' : 'Show'} explanation</Label>
			</CollapseButton>
		</CardHeader>
	)
}

const CardHeader = styled.div`
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

	> svg {
		vertical-align: middle;
		display: inline-block;
		margin-right: 0.5em;
	}
`
const Label = styled.span``
