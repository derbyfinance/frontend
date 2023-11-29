import DiscordIcon from '@components/icons/socialIcons/DiscordIcon'
import GithubIcon from '@components/icons/socialIcons/GithubIcon'
import MediumIcon from '@components/icons/socialIcons/MediumIcon'
import TwitterIcon from '@components/icons/socialIcons/TwitterIcon'
import { styled } from 'styled-components'

const FooterBar = () => {
	return (
		<Container>
			<div></div>
			<div>
				<FooterLink>
					<ExternalLink
						href="https://twitter.com/derby_finance"
						target="_blank">
						<TwitterIcon />
					</ExternalLink>
				</FooterLink>
				<FooterLink>
					<ExternalLink href="https://discord.gg/DyxRxs9mQ6" target="_blank">
						<DiscordIcon />
					</ExternalLink>
				</FooterLink>
				<FooterLink>
					<ExternalLink href="https://derby-finance.gitbook.io">
						<GithubIcon />
					</ExternalLink>
				</FooterLink>
				<FooterLink>
					<ExternalLink href="https://medium.com/derbyfinance" target="_blank">
						<MediumIcon />
					</ExternalLink>
				</FooterLink>
			</div>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1em;
	flex-wrap: nowrap;
	margin: 1em 0;
`
const FooterLink = styled.div`
	font-family: ${({ theme }) => theme.fonts.robotoRegular};
	font-size: 1.125em;
	display: inline-block;
`
const ExternalLink = styled.a`
	line-height: 2em;
	padding: 0 1em;
	font-family: ${({ theme }) => theme.fonts.slabLight};
	color: ${({ theme }) => theme.style.colorText};
	font-size: 1.25em;
	border-bottom: 4px solid transparent;
`

export default FooterBar
