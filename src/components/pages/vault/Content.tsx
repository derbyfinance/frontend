'use client'
import Banner from '@components/pages/Banner'
import InfoBar from '@components/pages/vault/InfoBar'
import { styled } from 'styled-components'

const Content = () => {
	return (
		<Container>
			<InfoBar />
			<Test />
		</Container>
	)
}

const Container = styled.div``
const Test = styled.div`
	height: 1000px;
`
export default Content
