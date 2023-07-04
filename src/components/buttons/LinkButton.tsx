import { AlignType } from '@datatypes/AlignType'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'
import { ButtonStyle } from './ActionButton'

interface Props extends LinkProps {
	$isCta?: boolean
	$isGhost?: boolean
	$isBlock?: boolean
	$align?: AlignType
	children: string | JSX.Element | JSX.Element[] | React.ReactNode
}

export default ({
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
			{...props}>
			{children}
		</Button>
	)
}

const Button = styled(Link)<{
	$isCta: boolean
	$isGhost: boolean
	$isBlock: boolean
	$align?: AlignType
}>`
	${ButtonStyle}
`
