'use client'

import { useEffect, useRef, useState } from 'react'

import { styled } from 'styled-components'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'

import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import {
	getAllocationListState,
	removeAllocationListState
} from '@store/RaceSlice'
import RaceCounter from '../race/RaceCounter'
import RaceDescription from '../race/RaceDescription'
import AllocateForm from './AllocateForm'
import AllocateSummary from './AllocateSummary'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getPlayerState } from '@store/UserSlice'

interface Props {
	network: string
	vault: string
}

export default ({ network, vault }: Props) => {
	const formRef = useRef<HTMLDivElement>(null)
	const allocateRef = useRef<HTMLDivElement>(null)

	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	
	const dispatch = useAppDispatch()
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)

	const [form, setForm] = useState<AllocationRequestModel>({
		nft: '',
		category: '',
		network: network,
		protocol: '',
		vault: vault,
		amount: 0,
		maxAmount: 0
	})

	useEffect(() => {
		if (player && player.player.baskets.length > 0) {
			setForm({ ...form, ...{ nft: player.player.baskets[0].id }  })
		}
	}, [player])

	const addAllocation = (): void => {
		setTimeout(() => {
			allocateRef.current?.scrollIntoView({
				block: 'start',
				inline: 'nearest',
				behavior: 'smooth'
			})
		}, 0)
	}

	const updateAllocation = (index: number) => {
		removeAllocation(index)

		setForm(allocationList![index])

		setTimeout(() => {
			formRef.current?.scrollIntoView({
				block: 'start',
				inline: 'nearest',
				behavior: 'smooth'
			})
		}, 0)
	}

	const removeAllocation = (index: number) => {
		dispatch(removeAllocationListState(index))
	}

	return (
		<Container>
			<RaceDescription />
			<AllocateCard>
				<div ref={formRef}>
					<AllocateCardHeader>
						<h1>Buy NFT</h1>
						<p>Some information about what and how.</p>
					</AllocateCardHeader>

					<AllocateCardContent>
						<AllocateForm initial={form} update={addAllocation} />
					</AllocateCardContent>
				</div>
				<div ref={allocateRef}>
					<AllocateCardHeader>
						<h1>Summary</h1>
						<p>Some information about what and how.</p>
					</AllocateCardHeader>

					<CardContent>
						<AllocateSummary
							update={updateAllocation}
							remove={removeAllocation}
						/>
					</CardContent>
				</div>
			</AllocateCard>

			<RaceCounter $isClean />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2em;
`
const AllocateCard = styled(Card)`
	background-color: ${({ theme }) => theme.style.formBg};
	border: none;
`
const AllocateCardHeader = styled(CardHeader)`
	border-bottom: 1px solid ${({ theme }) => theme.style.colorBorder};
	margin: 2em;
	margin-bottom: 1em;
	padding: 0 0 1.5em 0;
`
const AllocateCardContent = styled(CardContent)`
	padding: 1em 15%;
`
