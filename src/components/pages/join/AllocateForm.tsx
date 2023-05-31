import AllocationValidation from '@/validations/AllocationValidation'
import { Form, Formik, FormikProps } from 'formik'
import { styled } from 'styled-components'

import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'

import ActionButton from '@components/buttons/ActionButton'
import InputField from '@components/form/InputField'
import SelectInputField from '@components/form/SelectInputField'
import NetworkIcon from '@components/icons/NetworkIcon'
import VaultIcon from '@components/icons/VaultIcon'
import DerbyIcon from '@components/icons/chainIcons/DerbyIcon'

import NetworkOptions from './NetworkOptions'
import PercentageBar from './PercentageBar'
import VaultOptions from './VaultOptions'

interface Props {
	onSubmit: (form: AllocationRequestModel) => void
}

export default ({ onSubmit }: Props) => {
	const form: AllocationRequestModel = {
		network: '',
		vault: '',
		amount: 0
	}

	return (
		<Formik
			initialValues={form}
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
						options={
							<NetworkOptions inputName="network" formikProps={formikProps} />
						}
						required
					/>

					<SelectInputField
						inputName="vault"
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
	)
}

const DerbyIconWrapper = styled.div`
	display: flex;
	gap: 0.25em;
`
const SubmitContainer = styled.div`
	margin-top: 2em;
`
