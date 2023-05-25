import { styled } from 'styled-components'

interface Props {
	icon: JSX.Element
	amount: string | Number
	description: string
}

export default ({ icon, amount, description }: Props) => {
	return (
		<Block>
			<Icon>{icon}</Icon>
			<Info>
				<Value>
					{typeof amount === 'string' ? amount : amount.toLocaleString()}
				</Value>
				<Label>{description}</Label>
			</Info>
		</Block>
	)
}

const Block = styled.div`
	display: flex;
	gap: 0.5em;
`
const Icon = styled.div`
	margin-top: 0.5em;
`
const Info = styled.div``

const Value = styled.div`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	font-size: 1.5em;
	line-height: 1.5em;
`
const Label = styled.span`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	color: ${({ theme }) => theme.style.colorLabel};
	font-size: 0.625em;
	line-height: initial;
	text-transform: uppercase;
	display: block;
`
