import RaceBanner from '@components/banner/RaceBanner'
import Banner from '@components/pages/Banner'
import { useAppSelector } from '@hooks/ReduxStore'
import { isConnectedState } from '@store/UserSlice'
import { styled } from 'styled-components'

interface Props {
	isFullPage: boolean
	aside: JSX.Element | JSX.Element[] | React.ReactNode
}

const Aside = ({ isFullPage, aside }: Props) => {
	const isConnected = useAppSelector<boolean>(isConnectedState)

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
