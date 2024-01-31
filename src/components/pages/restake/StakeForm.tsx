import Notification from '@components/Notification'
import StockCurrency from '@components/StockCurrency'
import ActionButton from '@components/buttons/ActionButton'
import {
	FormInfoRow,
	FormRow,
	SubmitContainer
} from '@components/form/FormElements'
import InputField from '@components/form/InputField'
import DerbyIcon from '@components/icons/chainIcons/DerbyIcon'
import EthIcon from '@components/icons/chainIcons/EthIcon'
import { useAppSelector } from '@hooks/ReduxStore'
import useDepositDerbyToken from '@hooks/UseDepositDerbyToken'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import StakeRequestModel from '@models/requests/StakeRequestModel'
import { getAddressState, isConnectedState } from '@store/UserSlice'
import StakeValidation from '@validations/StakeValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { Hex } from 'viem'
import MaxAmountHiddenInput from '../join/MaxAmountHiddenInput'
import PercentageBar from '../join/PercentageBar'

const StakeForm = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const rewards = useDerbyTokenBalance(address)

	const [balance, setBalance] = useState<number>(0)
	const [amount, setAmount] = useState<number>(0)
	const [isApproved, setIsApproved] = useState<boolean>(false)

	const {
		data,
		dataApprove,
		errorApprove,
		errorPrepare,
		errorWrite,
		errorTx,
		isLoadingApprove,
		isLoadingPrepare,
		isLoadingTx,
		isSuccessApprove,
		isSuccessPrepare,
		isSuccessTx,
		write
	} = useDepositDerbyToken(amount, address, isApproved)

	const initial: StakeRequestModel = {
		nft: '',
		amount: 0,
		maxAmount: 0
	}

	useEffect(() => {
		setBalance(rewards)
	}, [rewards])



	useDidMountEffect(() => { 
		if (!isSuccessApprove) return
		
		write(dataApprove!.request)
	}, [isSuccessApprove])

	useDidMountEffect(() => { 
		if (!isSuccessPrepare) return 

		write(data!.request)
	}, [isSuccessPrepare])

	useDidMountEffect(() => {
		if (!isSuccessTx) return
		
		setIsApproved(true)
	}, [isSuccessTx])

	useDidMountEffect(() => {
		if (!errorWrite?.message) return

		setIsApproved(false)

		toast.error(
			<Notification
				title="Write stake tokens"
				notification="Something went wrong during the transaction"
			/>
		)
	}, [errorWrite])

	/*
	useDidMountEffect(() => {
		if (!errorApprove?.message) return

		toast.error(
			<Notification
				title="Approve stake tokens"
				notification={errorApprove.message}
			/>
		)
	}, [errorApprove])

	useDidMountEffect(() => {
		if (!errorTx?.message) return

		toast.error(
			<Notification
				title="Transaction stake tokens"
				notification={errorTx.message}
			/>
		)
	}, [errorTx])
*/
	
	const onSubmit = useCallback(
		(
			form: StakeRequestModel,
			formikHelpers: FormikHelpers<StakeRequestModel>
		) => {
			form.amount = Number(form.amount)
			setAmount(form.amount)
		},
		[]
	)

	return (
		<Formik
			initialValues={initial}
			validationSchema={StakeValidation}
			enableReinitialize={true}
			validateOnMount={false}
			isInitialValid={false}
			onSubmit={onSubmit}>
			{(formikProps: FormikProps<StakeRequestModel>) => (
				<Form noValidate>
					<FormInfoRow>
						<h3>Stake</h3>
						<p>Select amount</p>
					</FormInfoRow>

					<MaxAmountHiddenInput />

					<InputField
						inputName="amount"
						label={
							<>
								<span>Available balance:</span>&nbsp;
								<StockCurrency $amount={balance} $coin="ETH" $color="inherit" />
							</>
						}
						labelAlign="right"
						tabIndex={5}
						formikProps={formikProps}
						placeholder="0.0"
						required
						iconAlign="left"
						maxValue={rewards}
						isConnected={isConnected}
						icon={
							<IconWrapper>
								<span>ETH</span>
								<EthIcon width="1em" height="100%" />
							</IconWrapper>
						}
					/>
					{/* <PercentageBar /> */}

					<FormInfoRow>
						<h3>Receive</h3>
						<p>You will get</p>
					</FormInfoRow>

					<FormRow>
						<IconWrapper>
							<span>dfETH</span>
							<DerbyIcon width="1em" height="100%" />
						</IconWrapper>
						<div>
							<span>Exchange rate:</span>&nbsp;
							<StockCurrency
								$amount={1}
								$coin="ETH"
								$color="inherit"
								$decimals={0}
							/>
							<b> = </b>
							<StockCurrency $amount={1} $coin="DRB" $color="inherit" />
						</div>
					</FormRow>

					<SubmitContainer>
						<ActionButton
							$isBlock
							type="submit"
							$isCta
							$isLoading={isLoadingApprove || isLoadingPrepare || isLoadingTx}
							disabled={
								!formikProps.isValid || formikProps.values.maxAmount === 0
							}>
							{isApproved ? 'Stake ETH' : 'Approve staking'}
						</ActionButton>
					</SubmitContainer>
				</Form>
			)}
		</Formik>
	)
}

const IconWrapper = styled.div`
	display: flex;
	gap: 0.25em;
	justify-content: flex-start;
	align-items: center;

	& > span {
		font-family: ${({ theme }) => theme.fonts.slabMedium};
	}
`
export default StakeForm
