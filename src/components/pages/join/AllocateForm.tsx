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
import { setCreateNftModalOpenState } from '@store/SettingsSlice'
import { getPlayerData } from '@store/UserSlice'
import { useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import NetworkOptions from './NetworkOptions'
import PercentageBar from './PercentageBar'
import VaultOptions from './VaultOptions'

interface Props {
	initial: AllocationRequestModel
}

const AllocateForm = ({ initial }: Props) => {
	const summaryRef = useRef<HTMLDivElement>(null)

	const dispatch = useAppDispatch()

	const { address } = useAccount()

	useEffect(() => {
		if (address !== undefined) dispatch(getPlayerData(address))
	}, [address])

	const onSubmit = (
		form: AllocationRequestModel,
		formikHelpers: FormikHelpers<AllocationRequestModel>
	) => {
		form.amount = Number(form.amount)
		dispatch(setAllocationListState(form))

		formikHelpers.resetForm({
			values: {
				nft: '',
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

	const handleCreateNft = (): void => {
		dispatch(setCreateNftModalOpenState(true))
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
						<FormRow>
							<SelectInputField
								inputName="nft"
								label="Select NFT"
								formikProps={formikProps}
								placeholder="Select a NFT"
								tabIndex={1}
								options={
									<NetworkOptions inputName="nft" formikProps={formikProps} />
								}
								required
							/>
							<Label>or</Label>
							<ActionButton $isGhost onClick={handleCreateNft}>
								Create new NFT
							</ActionButton>
						</FormRow>

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
const FormRow = styled.div`
	display: flex;
	gap: 0.5em;
	justify-content: space-between;
	align-items: end;

	:first-child {
		flex: 1 1 auto;
	}
`
const Label = styled.span`
	color: ${({ theme }) => theme.style.colorLabel};
	line-height: 2.5em;
`

export default AllocateForm
