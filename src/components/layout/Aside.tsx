import Banner from '@components/pages/Banner'
import RaceBanner from '@components/pages/race/RaceBanner'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'

interface Props {
	isFullPage: boolean
	aside: JSX.Element | JSX.Element[] | React.ReactNode
}

const Aside = ({ isFullPage, aside }: Props) => {
	const { isConnected } = useAccount()

	return (
		<>
			{!isFullPage ? (
				<AsideContainer>
					{aside ?? isConnected ? <RaceBanner /> : <Banner />}
				</AsideContainer>
			) : null}
		</>
	)
}

const AsideContainer = styled.aside`
	flex: 0 0 34%;
`

export default Aside
