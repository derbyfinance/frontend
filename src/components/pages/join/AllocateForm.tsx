import AllocationValidation from '@/validations/AllocationValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { styled } from 'styled-components'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

import ActionButton from '@components/buttons/ActionButton'
import InputField from '@components/form/InputField'
import DerbyIcon from '@components/icons/chainIcons/DerbyIcon'

import { FormRow, SubmitContainer } from '@components/form/FormElements'
import { useAppDispatch } from '@hooks/ReduxStore'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import { setAllocationListState } from '@store/RaceSlice'
import { setCreateNftModalOpenState } from '@store/SettingsSlice'
import { getPlayerData } from '@store/UserSlice'
import { useRef } from 'react'
import { useAccount } from 'wagmi'
import NetworkSelect from './NetworkSelect'
import NftSelect from './NftSelect'
import PercentageBar from './PercentageBar'
import ProtocolSelect from './ProtocolSelect'
import VaultSelect from './VaultSelect'

interface Props {
	initial: AllocationRequestModel
}

const AllocateForm = ({ initial }: Props) => {
	const summaryRef = useRef<HTMLDivElement>(null)

	const dispatch = useAppDispatch()

	const { address, isConnected } = useAccount()

	useDidMountEffect(() => {
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
				protocol: '',
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
				validateOnMount={false}
				enableReinitialize
				onSubmit={onSubmit}>
				{(formikProps: FormikProps<AllocationRequestModel>) => (
					<Form noValidate>
						<FormRow>
							<NftSelect formikProps={formikProps} />

							<Label>or</Label>
							<ActionButton
								type="button"
								$isGhost
								onClick={handleCreateNft}
								disabled={!isConnected}>
								Create new NFT
							</ActionButton>
						</FormRow>

						<NetworkSelect formikProps={formikProps} />

						<ProtocolSelect formikProps={formikProps} />

						<VaultSelect formikProps={formikProps} />

						<InputField
							inputName="amount"
							label="Amount"
							tabIndex={5}
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
const Label = styled.span`
	color: ${({ theme }) => theme.style.colorLabel};
	line-height: 2.5em;
`

export default AllocateForm
