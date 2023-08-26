import AllocationValidation from '@validations/AllocationValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { styled } from 'styled-components'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

import ActionButton from '@components/buttons/ActionButton'
import InputField from '@components/form/InputField'
import DerbyIcon from '@components/icons/chainIcons/DerbyIcon'

import { FormRow, SubmitContainer } from '@components/form/FormElements'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import { setAllocationListState } from '@store/RaceSlice'
import { setCreateNftModalOpenState } from '@store/SettingsSlice'
import { getPlayerData, getPlayerState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import CategoryHiddenInput from './CategoryHiddenInput'
import MaxAmountHiddenInput from './MaxAmountHiddenInput'
import NetworkSelect from './NetworkSelect'
import NftSelect from './NftSelect'
import PercentageBar from './PercentageBar'
import ProtocolSelect from './ProtocolSelect'
import VaultSelect from './VaultSelect'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'

interface Props {
	initial: AllocationRequestModel
	update: VoidFunction
}

const AllocateForm = ({ initial, update }: Props) => {
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	const dispatch = useAppDispatch()

	const account = useAccount()

	useDidMountEffect(() => {
		if (account.address !== undefined) dispatch(getPlayerData(account.address))
	}, [account.address])

	useEffect(() => {
		setIsConnected(account.isConnected)
	}, [account.isConnected])

	const onSubmit = (
		form: AllocationRequestModel,
		formikHelpers: FormikHelpers<AllocationRequestModel>
	) => {
		form.amount = Number(form.amount)

		dispatch(setAllocationListState(form))

		formikHelpers.resetForm({
			values: {
				nft: initial.nft,
				category: '',
				network: '',
				protocol: '',
				vault: '',
				amount: 0,
				maxAmount: 0
			}
		})

		update()
	}

	const handleCreateNft = (): void => {
		dispatch(setCreateNftModalOpenState(true))
	}

	return (
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

						{player && player?.player.baskets.length === 0 && (<>
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
						
					</FormRow>

					<CategoryHiddenInput />

					<MaxAmountHiddenInput />

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

const DerbyIconWrapper = styled.div`
	display: flex;
	gap: 0.25em;
`
const Label = styled.span`
	color: ${({ theme }) => theme.style.colorLabel};
	line-height: 2.5em;
`

export default AllocateForm
