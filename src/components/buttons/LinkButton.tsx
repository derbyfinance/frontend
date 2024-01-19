import { AlignType } from '@datatypes/AlignType'
import Link, { LinkProps } from 'next/link'
import { styled } from 'styled-components'
import { ButtonStyle, ButtonStyleProps } from './ActionButton'

interface Props extends LinkProps {
	$isCta?: boolean
	$isGhost?: boolean
	$isBlock?: boolean
	$align?: AlignType
	target?: string
	children: string | JSX.Element | JSX.Element[] | React.ReactNode
}

const LinkButton = ({
	$isCta = false,
	$isGhost = false,
	$isBlock = false,
	$align,
	children,
	as,
	...props
}: Props) => {
	return (
		<Button
			$isCta={$isCta}
			$isGhost={$isGhost}
			$isBlock={$isBlock}
			$align={$align}
			scroll={true}
			{...props}>
			{children}
		</Button>
	)
}

const Button = styled(Link)<ButtonStyleProps>`
	${ButtonStyle as any}
`

export default LinkButton
