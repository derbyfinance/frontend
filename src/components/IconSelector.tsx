import DaiIcon from './icons/chainIcons/DaiIcon'
import DerbyIcon from './icons/chainIcons/DerbyIcon'
import UsdCIcon from './icons/chainIcons/UsdCIcon'
import UsdTIcon from './icons/chainIcons/UsdTIcon'

interface Props {
	name: string
}
export default ({ name }: Props) => {
	const selectIcon = (name: string): JSX.Element => {
		switch (name) {
			case 'USDC':
				return <UsdCIcon />
			case 'USDT':
				return <UsdTIcon />
			case 'DAI':
				return <DaiIcon />
			default:
				return <DerbyIcon />
		}
	}

	return selectIcon(name)
}
