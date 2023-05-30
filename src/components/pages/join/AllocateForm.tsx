import AllocationValidation from '@/validations/AllocationValidation'
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik'
import { styled } from 'styled-components'

import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'

import ActionButton from '@components/buttons/ActionButton'
import Card from '@components/card/Card'
import CardContent from '@components/card/CardContent'
import CardHeader from '@components/card/CardHeader'
import InputField from '@components/form/InputField'
import SelectInputField from '@components/form/SelectInputField'
import NetworkIcon from '@components/icons/NetworkIcon'
import VaultIcon from '@components/icons/VaultIcon'
import DerbyIcon from '@components/icons/chainIcons/DerbyIcon'

import NetworkOptions from './NetworkOptions'
import PercentageBar from './PercentageBar'
import VaultOptions from './VaultOptions'

interface Props {}

export default ({}: Props) => {
	const form: AllocationRequestModel = {
		network: '',
		vault: '',
		amount: 0
	}

	const onSubmit = (form: AllocationRequestModel) => {
		console.log(form)
	}

	return (
		<AllocateCard>
			<AllocateCardHeader>
				<h1>Buy NFT</h1>
				<p>Some information about what and how.</p>
			</AllocateCardHeader>
			<AllocateCardContent>
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
									<NetworkOptions
										inputName="network"
										formikProps={formikProps}
									/>
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
			</AllocateCardContent>
			<AllocateCardHeader>
				<h1>Summary</h1>
				<p>Some information about what and how.</p>
			</AllocateCardHeader>
			<AllocateCardContent>x</AllocateCardContent>
		</AllocateCard>
	)
}

const Label = styled.span``

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
const DerbyIconWrapper = styled.div`
	display: flex;
	gap: 0.25em;
`
const SubmitContainer = styled.div`
	margin-top: 2em;
`
