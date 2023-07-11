import { styled } from 'styled-components'

import { Colorpicker } from '@functions/ColorpickerFunction'

interface Props {
	name: string
	icon?: JSX.Element
	$isSmall?: boolean
}
const Avatar = ({ name, icon, $isSmall = false, ...props }: Props) => {
	return (
		<AvatarBody $isSmall={$isSmall} {...props}>
			<Color $color={name == '' ? 'transparent' : Colorpicker(name)}>
				{icon}
			</Color>
		</AvatarBody>
	)
}

const AvatarBody = styled.div<{ $isSmall: boolean }>`
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: 2em;
	width: ${({ $isSmall }) => ($isSmall ? '1.5em' : '4em')};
	height: ${({ $isSmall }) => ($isSmall ? '1.5em' : '4em')};
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

	> svg {
		vertical-align: baseline;
	}
`

export default Avatar
