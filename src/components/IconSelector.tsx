import AkkoIcon from './icons/chainIcons/AkkoIcon'
import DaiIcon from './icons/chainIcons/DaiIcon'
import EthIcon from './icons/chainIcons/EthIcon'
import UsdCIcon from './icons/chainIcons/UsdCIcon'
import UsdTIcon from './icons/chainIcons/UsdTIcon'
import WbtcIcon from './icons/chainIcons/WbtcIcon'
import CoinbaseIcon from './icons/walletIcons/CoinbaseIcon'
import MetaMaskIcon from './icons/walletIcons/MetaMaskIcon'
import WalletConnecIcon from './icons/walletIcons/WalletConnecIcon'

interface Props {
	name: string
}
const IconSelector = ({ name }: Props) => {
	const selectIcon = (name: string): JSX.Element => {
		switch (name) {
			case 'ETH':
				return <EthIcon />
			case 'USDC':
				return <UsdCIcon />
			case 'USDT':
				return <UsdTIcon />
			case 'DAI':
				return <DaiIcon />
			case 'WBTC':
				return <WbtcIcon />
			case 'MetaMask':
				return <MetaMaskIcon />
			case 'Coinbase Wallet':
				return <CoinbaseIcon />
			case 'WalletConnect':
				return <WalletConnecIcon />
			default:
				return <AkkoIcon width="48" height="48" />
		}
	}

	return selectIcon(name)
}

export default IconSelector
