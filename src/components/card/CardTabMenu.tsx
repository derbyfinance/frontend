import { styled } from 'styled-components'
import CardHeader from './CardHeader'
import CardRowButton from './CardRowButton'

interface Props {
	menu: string[]
	selected: string
	onChange: (id: string) => void
}

const CardTabMenu = ({ menu, selected, onChange, ...props }: Props) => {
	return (
		<XCardHeader {...props}>
			{menu?.map((item, index) => (
				<MenuButton
					key={index}
					type="button"
					$isActive={selected === item}
					onClick={() => onChange(item)}>
					{item}
				</MenuButton>
			))}
		</XCardHeader>
	)
}

const XCardHeader = styled(CardHeader)`
	> div {
		flex: 1 1 auto;
		border-bottom: 1px solid ${({ theme }) => theme.style.colorText};
		height: 3em;
		padding: 0 0.5em;
	}
`
const MenuButton = styled(CardRowButton)<{ $isActive: boolean }>`
	border-top-left-radius: ${({ theme }) => theme.style.radius}px;
	border-top-right-radius: ${({ theme }) => theme.style.radius}px;
	border: 1px solid
		${({ $isActive, theme }) =>
			$isActive ? theme.style.colorText : 'transparent'};

	border-bottom-width: ${({ $isActive }) => ($isActive ? '3px' : '1px')};
	border-bottom-color: ${({ $isActive, theme }) =>
		$isActive ? theme.style.formBg : theme.style.colorText};
	color: ${({ $isActive, theme }) =>
		$isActive ? theme.style.colorText : theme.style.colorDisabled};

	font-family: ${({ theme }) => theme.fonts.slabRegular};

	padding: 0.5em 1em;
	text-align: center;
	width: auto;
	display: inline-block;
	height: 3em;
`
export default CardTabMenu
