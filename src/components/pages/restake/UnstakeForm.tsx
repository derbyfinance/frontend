import { FormInfoRow } from '@components/form/FormElements'
import AkkorokamuiIcon from '@components/icons/AkkorokamuiIcon'
import { styled } from 'styled-components'

const UnstakeForm = () => {
	return (
		<>
			<LogoBox>
				<AkkorokamuiIcon />
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
	width: 8em;
	height: 8em;
	margin: 1em auto;
	padding: 1em;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.style.colorText};
`
export default UnstakeForm
