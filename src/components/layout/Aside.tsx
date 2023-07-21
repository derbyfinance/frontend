import RaceBanner from '@components/banner/RaceBanner'
import Banner from '@components/pages/Banner'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'

interface Props {
	isFullPage: boolean
	aside: JSX.Element | JSX.Element[] | React.ReactNode
}

const Aside = ({ isFullPage, aside }: Props) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const account = useAccount()

	useEffect(() => {
		setIsConnected(account.isConnected)
	}, [account.isConnected])

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
