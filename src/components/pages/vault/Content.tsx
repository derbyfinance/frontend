'use client'
import Banner from '@components/pages/Banner'
import InfoBar from '@components/pages/vault/InfoBar'
import { styled } from 'styled-components'

export default () => {
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
