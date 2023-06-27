import AllocationValidation from '@/validations/AllocationValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { styled } from 'styled-components'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

import ActionButton from '@components/buttons/ActionButton'
import InputField from '@components/form/InputField'
import SelectInputField from '@components/form/SelectInputField'
import NetworkIcon from '@components/icons/NetworkIcon'
import VaultIcon from '@components/icons/VaultIcon'
import DerbyIcon from '@components/icons/chainIcons/DerbyIcon'

import { useAppDispatch } from '@hooks/ReduxStore'
import { setAllocationListState } from '@store/RaceSlice'
import { useRef } from 'react'
import NetworkOptions from './NetworkOptions'
import PercentageBar from './PercentageBar'
import VaultOptions from './VaultOptions'

interface Props {
	initial: AllocationRequestModel
}

export default ({ initial }: Props) => {
	const summaryRef = useRef<HTMLDivElement>(null)

	const dispatch = useAppDispatch()

	const onSubmit = (
		form: AllocationRequestModel,
		formikHelpers: FormikHelpers<AllocationRequestModel>
	) => {
		form.amount = Number(form.amount)
		dispatch(setAllocationListState(form))

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

	return (
		<div ref={summaryRef}>
			<Formik
				initialValues={initial}
				validationSchema={AllocationValidation}
				isInitialValid={false}
				enableReinitialize
				onSubmit={onSubmit}>
				{(formikProps: FormikProps<AllocationRequestModel>) => (
					<Form noValidate>
						<SelectInputField
							inputName="network"
							label={
								<>
									<NetworkIcon />
									<span>Network</span>
								</>
							}
							formikProps={formikProps}
							placeholder="Select a network"
							tabIndex={1}
							options={
								<NetworkOptions inputName="network" formikProps={formikProps} />
							}
							required
						/>

						<SelectInputField
							inputName="vault"
							tabIndex={2}
							label={
								<>
									<VaultIcon />
									<span>Vault</span>
								</>
							}
							formikProps={formikProps}
							placeholder="Select a vault"
							options={
								<VaultOptions inputName="vault" formikProps={formikProps} />
							}
							required
						/>

						<InputField
							inputName="amount"
							label="Amount"
							tabIndex={3}
							formikProps={formikProps}
							placeholder="0.0"
							required
							icon={
								<DerbyIconWrapper>
									<span>DRB</span>
									<DerbyIcon width="1.5em" height="100%" />
								</DerbyIconWrapper>
							}
						/>
						<PercentageBar />
						<SubmitContainer>
							<ActionButton
								$isGhost
								$isBlock
								type="submit"
								disabled={!formikProps.isValid}>
								+ Save and Add another vault
							</ActionButton>
						</SubmitContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

const DerbyIconWrapper = styled.div`
	display: flex;
	gap: 0.25em;
`
const SubmitContainer = styled.div`
	margin-top: 2em;
`
