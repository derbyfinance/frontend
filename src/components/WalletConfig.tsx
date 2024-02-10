import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { createClient } from 'viem'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const metaMask = injected({ target: 'metaMask' })

const queryClient = new QueryClient()

export const config = createConfig({
	chains: [mainnet, sepolia],
	client({ chain }) {
		return createClient({ chain, transport: http() })
	},
	connectors: [
		metaMask,
		coinbaseWallet({
			appName: 'Akko'
		}),
		walletConnect({
			projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? ''
		})
	]
})

interface Props {
	children: React.ReactNode
}
const WalletConfig = ({ children }: Props) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}

export default WalletConfig
