'use client'

import { useRef, useState } from 'react'

import { styled } from 'styled-components'

import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'

import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'

import { FormikHelpers } from 'formik'
import RaceCounter from '../race/RaceCounter'
import RaceDescription from '../race/RaceDescription'
import AllocateForm from './AllocateForm'
import AllocateSummary from './AllocateSummary'

interface Props {
	network: string
	vault: string
}
export default ({ network, vault }: Props) => {
	const formRef = useRef<HTMLDivElement>(null)
	const summaryRef = useRef<HTMLDivElement>(null)

	const [form, setForm] = useState<AllocationRequestModel>({
		network: network,
		vault: vault,
		amount: 0
	})

	const [allocateList, setAllocateList] = useState<AllocationRequestModel[]>([])

	const onSubmit = (
		form: AllocationRequestModel,
		formikHelpers: FormikHelpers<AllocationRequestModel>
	) => {
		const index = allocateList.findIndex(
			({ network, vault }) => network === form.network && vault === form.vault
		)

		if (index >= 0) {
			const update = allocateList[index]
			update.amount += form.amount
			setAllocateList([
				...allocateList.slice(0, index),
				update,
				...allocateList.slice(index + 1)
			])
		} else {
			setAllocateList([...allocateList, form])
		}

		formikHelpers.resetForm({
			values: {
				network: '',
				vault: '',
				amount: 0
			}
		})

		setTimeout(() => {
			summaryRef.current?.scrollIntoView({
				block: 'center',
				inline: 'nearest',
				behavior: 'smooth'
			})
		}, 0)
	}

	const updateAllocation = (index: number) => {
		removeAllocation(index)

		setForm(allocateList[index])

		setTimeout(() => {
			formRef.current?.scrollIntoView({
				block: 'center',
				inline: 'nearest',
				behavior: 'smooth'
			})
		}, 0)
	}

	const removeAllocation = (index: number) => {
		const items = [...allocateList]
		items.splice(index, 1)
		setAllocateList(items)
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
					<div ref={formRef}>
						<AllocateForm initial={form} onSubmit={onSubmit} />
					</div>
				</AllocateCardContent>

				<AllocateCardHeader>
					<h1>Summary</h1>
					<p>Some information about what and how.</p>
				</AllocateCardHeader>

				<CardContent>
					<div ref={summaryRef}>
						<AllocateSummary
							allocateList={allocateList}
							update={updateAllocation}
							remove={removeAllocation}
						/>
					</div>
				</CardContent>
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
	margin-bottom: 1em;
	padding: 0 0 1.5em 0;
`
const AllocateCardContent = styled(CardContent)`
	padding: 1em 15%;
`
