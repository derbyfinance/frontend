import LinkButton from '@components/LinkButton'
import { Title } from '@components/fonts/Title'
import LogoIcon from '@components/icons/LogoIcon'
import { styled } from 'styled-components'

export default () => {
	return (
		<Banner>
			<LogoIcon />
			<Title>
				Go ahead, connect your wallet and try our super secure vault.
			</Title>
			<LinkButton href="/">Connect your Wallet</LinkButton>
		</Banner>
	)
}

const Banner = styled.div`
	position: sticky;
	top: 1em;
	background-image: ${({ theme }) => theme.style.backgroundGradient};
	border-radius: ${({ theme }) => theme.style.radius}px;
	color: ${({ theme }) => theme.style.buttonColor};
	padding: 5em 2em;
	display: flex;
	gap: 2em;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`
