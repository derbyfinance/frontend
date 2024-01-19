'use client'

import { device, deviceSize } from '@helpers/DeviceHelper'
import { store } from '@store/Store'
import { GlobalStyles } from '@theme/ThemeConfig'
import { Provider } from 'react-redux'
import { styled } from 'styled-components'
import NotificationConfig from '../NotificationConfig'
import ThemeWrapper from '../ThemeWrapper'
import WalletConfig from '../WalletConfig'
import PageSize from '../debugger/PageSize'
import FooterBar from '../footer/FooterBar'
import ConnectWalletModal from '../modal/ConnectWalletModal'
import CreateNftModal from '../modal/CreateNftModal'
import Navigation from '../navigation/Navigation'
import Aside from './Aside'

interface Props {
	isFullPage?: boolean
	isSmall?: boolean
	aside?: JSX.Element | JSX.Element[] | React.ReactNode
	children: JSX.Element | JSX.Element[] | React.ReactNode
}

const Layout = ({
	isFullPage = false,
	isSmall = false,
	aside,
	children
}: Props) => {
	return (
		<Provider store={store}>
			<ThemeWrapper>
				<GlobalStyles />
				<WalletConfig>
					<MainContainer>
						<NotificationConfig />
						<ConnectWalletModal />
						<CreateNftModal />
						<Header>
							<Navigation />
						</Header>
						<Content>
							<Main $isSmall={isSmall}>{children}</Main>
							<Aside isFullPage={isFullPage} aside={aside} />
						</Content>
						<Footer>
							<FooterBar />
						</Footer>
					</MainContainer>
				</WalletConfig>
				<PageSize />
			</ThemeWrapper>
		</Provider>
	)
}

const MainContainer = styled.div`
	position: relative;
	width: 100%;
	min-height: 100%;
	margin: 0 auto;
	padding: 0 1em;

	@media ${device.desktop} {
		max-width: ${deviceSize.desktop};
	}

	display: flex;
	flex-direction: column;
	gap: 1em;
`
const Content = styled.div`
	flex: 1 0 auto;
	display: flex;
	gap: 1em;
	justify-content: center;
`
const Header = styled.header`
	flex: 0 0 auto;
`
const Main = styled.main<{ $isSmall: boolean }>`
	flex: 1 1 auto;
	${({ $isSmall }) =>
		$isSmall &&
		`
	flex: 0 0 50%;
`}
`
const Footer = styled.footer`
	flex: 0 0 auto;
`

export default Layout
