'use client'

import { styled } from 'styled-components'

import RaceCounter from '../race/RaceCounter'
import RaceDescription from '../race/RaceDescription'
import AllocateForm from './AllocateForm'

export default () => {
	return (
		<Container>
			<RaceDescription />
			<AllocateForm />
			<RaceCounter $isClean />
		</Container>
	)
}

const Container = styled.div``
