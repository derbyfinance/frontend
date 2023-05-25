import DiscordIcon from '@components/icons/socialIcons/DiscordIcon'
import GithubIcon from '@components/icons/socialIcons/GithubIcon'
import MediumIcon from '@components/icons/socialIcons/MediumIcon'
import TwitterIcon from '@components/icons/socialIcons/TwitterIcon'
import NavLink from '@components/navigation/NavLink'
import { styled } from 'styled-components'

export default () => {
	return (
		<Container>
			<div>
				<FooterLink href="/privacy">Privacy policy</FooterLink>
				<FooterLink href="/agreement">User agreement</FooterLink>
				<FooterLink href="/terms">Terms of use</FooterLink>
			</div>
			<div>
				<FooterLink href="https://twitter.com/derby_finance">
					<TwitterIcon />
				</FooterLink>
				<FooterLink href="https://discord.gg/DyxRxs9mQ6">
					<DiscordIcon />
				</FooterLink>
				<FooterLink href="https://derby-finance.gitbook.io">
					<GithubIcon />
				</FooterLink>
				<FooterLink href="https://medium.com/derbyfinance">
					<MediumIcon />
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

const FooterLink = styled(NavLink)`
	font-family: ${({ theme }) => theme.fonts.robotoRegular};
	font-size: 1.125em;
	display: inline-block;

	> svg {
		display: block;
	}
`
