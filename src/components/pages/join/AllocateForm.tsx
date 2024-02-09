import AllocationValidation from '@validations/AllocationValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { styled } from 'styled-components'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

import ActionButton from '@components/buttons/ActionButton'
import InputField from '@components/form/InputField'

import { FormRow, SubmitContainer } from '@components/form/FormElements'
import AkkoIcon from '@components/icons/chainIcons/AkkoIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { setAllocationListState } from '@store/RaceSlice'
import { setCreateNftModalOpenState } from '@store/SettingsSlice'
import { getPlayerState, isConnectedState } from '@store/UserSlice'
import { useCallback } from 'react'
import MaxAmountHiddenInput from './MaxAmountHiddenInput'
import NftSelect from './NftSelect'
import PercentageBar from './PercentageBar'
import ProtocolSelect from './ProtocolSelect'
import VaultSelect from './VaultSelect'

interface Props {
	initial: AllocationRequestModel
	update: VoidFunction
}

const AllocateForm = ({ initial, update }: Props) => {
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	const dispatch = useAppDispatch()

	const onSubmit = useCallback(
		(
			form: AllocationRequestModel,
			formikHelpers: FormikHelpers<AllocationRequestModel>
		) => {
			form.amount = Number(form.amount)

			dispatch(setAllocationListState(form))

			formikHelpers.resetForm({
				values: {
					nft: initial.nft,
					protocol: '',
					vault: '',
					amount: 0,
					maxAmount: 0
				}
			})

			update()
		},
		[player, initial]
	)

	const handleCreateNft = useCallback((): void => {
		dispatch(setCreateNftModalOpenState(true))
	}, [])

	return (
		<Formik
			initialValues={initial}
			validationSchema={AllocationValidation}
			enableReinitialize={true}
			validateOnMount={false}
			isInitialValid={false}
			onSubmit={onSubmit}>
			{(formikProps: FormikProps<AllocationRequestModel>) => (
				<Form noValidate>
					<XFormRow>
						<NftSelect formikProps={formikProps} />

						{(!player?.player ||
							player?.player?.baskets.length === 0 ||
							Boolean(
								JSON.parse(process.env.NEXT_PUBLIC_DEBUG ?? 'false')
							)) && (
							<>
								<Label>or</Label>
								<ActionButton
									type="button"
									$isGhost
									onClick={handleCreateNft}
									disabled={!isConnected}>
									Create new NFT
								</ActionButton>
							</>
						)}
					</XFormRow>

					<MaxAmountHiddenInput />

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
							<AkkoIconWrapper>
								<span>AKK</span>
								<AkkoIcon width="1.5em" height="100%" />
							</AkkoIconWrapper>
						}
					/>
					<PercentageBar />

					<SubmitContainer>
						<ActionButton
							$isGhost
							$isBlock
							type="submit"
							disabled={
								!formikProps.isValid || formikProps.values.maxAmount === 0
							}>
							+ Save and Add another vault
						</ActionButton>
					</SubmitContainer>
				</Form>
			)}
		</Formik>
	)
}

const AkkoIconWrapper = styled.div`
	display: flex;
	gap: 0.25em;
`
const Label = styled.span`
	color: ${({ theme }) => theme.style.colorLabel};
	line-height: 2.5em;
`
const XFormRow = styled(FormRow)`
	& > div:first-child {
		flex: 1 1 auto;
	}
`

export default AllocateForm
