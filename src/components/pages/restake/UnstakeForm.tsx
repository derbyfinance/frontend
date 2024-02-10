import { FormInfoRow } from '@components/form/FormElements'
import LogoIcon from '@components/icons/LogoIcon'
import { styled } from 'styled-components'

const UnstakeForm = () => {
	return (
		<>
			<LogoBox>
				<LogoIcon />
			</LogoBox>
			<FormInfoRow $align="center">
				<h3>Unstaking NFT is coming soon</h3>
				<p>
					The team is working hard to make unstaking available.
					<br />
					{/* <u>Join the discussion</u> on Discord and stay posted. */}
				</p>
			</FormInfoRow>
			{/* <LinkButton
				href="https://discord.gg/DyxRxs9mQ6"
				target="_blank"
				$isBlock
				$isCta>
				<DiscordMessageIcon width="1.25em" height="1.25em" /> Join the
				Discussion on Discord
			</LinkButton> */}
		</>
	)
}

const LogoBox = styled.div`
	width: 6em;
	height: 6em;
	margin: 1em auto;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.style.colorText};
`
export default UnstakeForm
