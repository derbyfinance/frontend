import EyeClosedIcon from '@components/icons/EyeClosedIcon'
import EyeOpenIcon from '@components/icons/EyeOpenIcon'
import { styled } from 'styled-components'

interface Props {
	isOpen?: boolean
	handleClick: VoidFunction
	children: JSX.Element | JSX.Element[] | React.ReactNode
}
export default ({ isOpen, handleClick, children }: Props) => {
	return (
		<CardHeader onClick={handleClick}>
			{children}
			<Collapse>
				{isOpen ? <EyeClosedIcon /> : <EyeOpenIcon />}
				<Label>{isOpen ? 'Hide' : 'Show'} explanation</Label>
			</Collapse>
		</CardHeader>
	)
}

const CardHeader = styled.div`
	padding: 2em;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
`
const Collapse = styled.div`
	font-family: ${({ theme }) => theme.fonts.slabRegular};
	color: ${({ theme }) => theme.style.colorLabel};
	font-size: 0.875em;
	vertical-align: middle;

	> svg {
		vertical-align: middle;
		display: inline-block;
		margin-right: 0.5em;
	}
`
const Label = styled.span``
