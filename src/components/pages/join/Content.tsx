'use client'

import { useState } from 'react'

import { styled } from 'styled-components'

import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'

import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'

import RaceCounter from '../race/RaceCounter'
import RaceDescription from '../race/RaceDescription'
import AllocateForm from './AllocateForm'

export default () => {
	const [allocateList, setAllocateList] = useState<AllocationRequestModel[]>([])

	const onSubmit = (form: AllocationRequestModel) => {
		console.log(form)
		setAllocateList([...allocateList, form])
	}

	return (
		<Container>
			<RaceDescription />
			<AllocateCard>
				<AllocateCardHeader>
					<h1>Buy NFT</h1>
					<p>Some information about what and how.</p>
				</AllocateCardHeader>
				<AllocateCardContent>
					<AllocateForm onSubmit={onSubmit} />
				</AllocateCardContent>

				<AllocateCardHeader>
					<h1>Summary</h1>
					<p>Some information about what and how.</p>
				</AllocateCardHeader>
				<AllocateCardContent>
					{allocateList.map(({ network }, index) => (
						<span key={index}>{network}</span>
					))}
				</AllocateCardContent>
			</AllocateCard>

			<RaceCounter $isClean />
		</Container>
	)
}

const Container = styled.div``

const AllocateCard = styled(Card)`
	background-color: ${({ theme }) => theme.style.formBg};
	border: none;
`
const AllocateCardHeader = styled(CardHeader)`
	border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};
	margin: 2em;
	padding: 0 0 1.5em 0;
`
const AllocateCardContent = styled(CardContent)`
	padding: 1em 10em;
`
