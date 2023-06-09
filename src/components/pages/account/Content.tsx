'use client'

import ActionButton from '@components/buttons/ActionButton'
import { styled } from 'styled-components'
import { useDisconnect } from 'wagmi'

const Content = () => {
	const { disconnectAsync } = useDisconnect()

	const handleDisconnect = async () => {
		try {
			await disconnectAsync()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Container>
			<h1>Account</h1>
			<ActionButton onClick={handleDisconnect}>Disconnect</ActionButton>
		</Container>
	)
}

const Container = styled.div``

export default Content
