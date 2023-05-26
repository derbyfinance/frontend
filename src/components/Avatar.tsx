import { styled } from 'styled-components'

import { Colorpicker } from '@functions/ColorpickerFunction'

interface Props {
	name: string
}
export default ({ name }: Props) => {
	return (
		<Avatar>
			<Color $color={Colorpicker(name)} />
		</Avatar>
	)
}

const Avatar = styled.div`
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: 2em;
	width: 4em;
	height: 4em;
	position: relative;
`
const Color = styled.div<{ $color: string }>`
	background-color: ${({ $color }) => $color};
	border-radius: 0.75em;
	width: 1.5em;
	height: 1.5em;
	position: absolute;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	margin: auto;
`
