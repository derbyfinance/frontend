import {
	arbitrum,
	arbitrumGoerli,
	goerli,
	mainnet,
	optimism,
	polygon,
	polygonMumbai
} from '@wagmi/core/chains'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient } = configureChains(
	[mainnet, polygon, polygonMumbai, arbitrum, arbitrumGoerli, optimism, goerli],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API ?? '' })]
)

const config = createConfig({
	publicClient: publicClient,
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains: chains,
			options: {
				appName: 'Derby Finance'
			}
		})
		//new WalletConnectConnector({ chains: chains, options: {projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? ''} }),
	]
})

interface Props {
	children: React.ReactNode
}
const WalletConfig = ({ children }: Props) => {
	return <WagmiConfig config={config}>{children}</WagmiConfig>
}

export default WalletConfig
