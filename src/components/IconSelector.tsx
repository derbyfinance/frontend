import DaiIcon from './icons/chainIcons/DaiIcon'
import DerbyIcon from './icons/chainIcons/DerbyIcon'
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
export default ({ name }: Props) => {
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
			case 'Wallet Connect':
				return <WalletConnecIcon />
			default:
				return <DerbyIcon width="100%" height="100%" />
		}
	}

	return selectIcon(name)
}
