'use client'

import { device, deviceSize } from '@helpers/DeviceHelper'
import { persistor, store } from '@store/Store'
import { GlobalStyles } from '@theme/ThemeConfig'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import styled from 'styled-components'
import ThemeWrapper from './ThemeWrapper'
import WalletConfig from './WalletConfig'
import PageSize from './debugger/PageSize'
import FooterBar from './footer/FooterBar'
import ConnectWalletModal from './modal/ConnectWalletModal'
import Navigation from './navigation/Navigation'
import Banner from './pages/Banner'

interface Props {
	isFullPage?: boolean
	aside?: JSX.Element | JSX.Element[] | React.ReactNode
	children: JSX.Element | JSX.Element[] | React.ReactNode
}

const Layout = ({ isFullPage = false, aside, children }: Props) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeWrapper>
					<GlobalStyles />
					<WalletConfig>
						<MainContainer>
							<ConnectWalletModal />
							<Header>
								<Navigation />
							</Header>
							<Content>
								<Main>{children}</Main>
								{!isFullPage ? <Aside>{aside ?? <Banner />}</Aside> : null}
							</Content>
							<Footer>
								<FooterBar />
							</Footer>
						</MainContainer>
					</WalletConfig>
					<PageSize />
				</ThemeWrapper>
			</PersistGate>
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
`
const Content = styled.div`
	flex: 1 0 auto;
	display: flex;
	gap: 1em;
`
const Header = styled.header`
	flex: 0 0 auto;
`
const Main = styled.main`
	flex: 1 1 auto;
`
const Aside = styled.aside`
	flex: 0 0 34%;
`
const Footer = styled.footer`
	flex: 0 0 auto;
`

export default Layout
