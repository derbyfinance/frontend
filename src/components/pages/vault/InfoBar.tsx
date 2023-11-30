import NetworkInfo from '@components/NetworkInfo'
import { Title } from '@components/fonts/Title'
import LockIcon from '@components/icons/LockIcon'
import MembersIcon from '@components/icons/MembersIcon'
import VaultIcon from '@components/icons/VaultIcon'
import PolygonIcon from '@components/icons/chainIcons/PolygonIcon'
import { ToCurrency } from '@functions/CurrencyFunction'
import { styled } from 'styled-components'

const InfoBar = () => {
	return (
		<InfoBarComponent>
			<ChangeNetwork>
				<Title $align="left">Polygon Mumbai</Title>
				<Network>
					<NetworkData>
						<NetworkInfo
							icon={<LockIcon />}
							amount={ToCurrency(1000000, 0, true)}
							description="Total value locked"
						/>
						<NetworkInfo icon={<VaultIcon />} amount={5} description="Vaults" />
						<NetworkInfo
							icon={<MembersIcon />}
							amount={2177}
							description="Members"
						/>
					</NetworkData>
					<NetworkLogo>
						<PolygonIcon width="100%" height="100%" />
					</NetworkLogo>
				</Network>
			</ChangeNetwork>
		</InfoBarComponent>
	)
}

const InfoBarComponent = styled.div`
	width: 100%;
	padding: 2em;
	border-radius: ${({ theme }) => theme.style.radius}px;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	background-image: url('/images/background-vault.png');
	background-repeat: no-repeat;
	background-position: 60px 55%;
	background-size: 100% auto;
	min-height: 10em;
`

const ChangeNetwork = styled.div``

const Network = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 1em;
`
const NetworkData = styled.div`
	display: flex;
	gap: 1em;
	justify-content: space-between;
	flex-wrap: wrap;
`
const NetworkLogo = styled.div`
	width: 175px;
	height: 100px;
	overflow: hidden;
`
export default InfoBar
