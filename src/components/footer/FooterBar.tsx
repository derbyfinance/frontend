import DiscordIcon from '@components/icons/socialIcons/DiscordIcon'
import GithubIcon from '@components/icons/socialIcons/GithubIcon'
import MediumIcon from '@components/icons/socialIcons/MediumIcon'
import TwitterIcon from '@components/icons/socialIcons/TwitterIcon'
import NavLink from '@components/navigation/NavLink'
import { styled } from 'styled-components'

const FooterBar = () => {
	return (
		<Container>
			<div>
			</div>
			<div>
				<FooterLink>
					<NavLink href="https://twitter.com/derby_finance">
						<TwitterIcon />
					</NavLink>
				</FooterLink>
				<FooterLink>
					<NavLink href="https://discord.gg/DyxRxs9mQ6">
						<DiscordIcon />
					</NavLink>
				</FooterLink>
				<FooterLink>
					<NavLink href="https://derby-finance.gitbook.io">
						<GithubIcon />
					</NavLink>
				</FooterLink>
				<FooterLink>
					<NavLink href="https://medium.com/derbyfinance">
						<MediumIcon />
					</NavLink>
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

export default FooterBar