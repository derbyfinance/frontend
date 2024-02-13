import { vaultAbi } from '@/abis/vaultAbi'
import Notification from '@components/Notification'
import StockCurrency from '@components/StockCurrency'
import ActionButton from '@components/buttons/ActionButton'
import {
	FormInfoRow,
	FormRow,
	SubmitContainer
} from '@components/form/FormElements'
import InputField from '@components/form/InputField'
import AkkoIcon from '@components/icons/chainIcons/AkkoIcon'
import EthIcon from '@components/icons/chainIcons/EthIcon'
import { useAppSelector } from '@hooks/ReduxStore'
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import useStakeEth from '@hooks/UseStakeEth'
import StakeRequestModel from '@models/requests/StakeRequestModel'
import { getAddressState, isConnectedState } from '@store/UserSlice'
import StakeValidation from '@validations/StakeValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styled } from 'styled-components'
import { Hex, parseEther } from 'viem'
import { sepolia } from 'viem/chains'
import { useChainId, useSwitchChain } from 'wagmi'
import MaxAmountHiddenInput from '../join/MaxAmountHiddenInput'
import ExchangeRate from './ExchangeRate'

const StakeForm = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const { rewards, refetch: rewardsRefetch } = useDerbyTokenBalance(address)
	const { switchChain } = useSwitchChain()
	const chainId = useChainId()

	const [balance, setBalance] = useState<number>(0)
	const [exhangeRate, setExhangeRate] = useState<number>(1)

	const {
		tokenBalance,
		refetch,
		isLoading,
		isPending,
		isSuccess,
		error,
		writeContract
	} = useStakeEth(address)

	const initial: StakeRequestModel = {
		amount: 0,
		maxAmount: 0
	}

	useEffect(() => {
		setBalance(rewards)
	}, [rewards, chainId])

	// Will prompt to switch chains when wallet is not connected to sepolia
	// Probably not in the right place
	useEffect(() => {
		if (
			!Boolean(JSON.parse(process.env.NEXT_PUBLIC_MAINNET ?? 'false')) &&
			chainId != sepolia.id
		) {
			switchChain({ chainId: sepolia.id })
		}
	}, [])

	useDidMountEffect(() => {
		if (!isSuccess) return

		refetch()
		rewardsRefetch()

		toast.success(
			<Notification
				title="Stake ETH"
				notification="ETH is staked succesfully."
			/>
		)
	}, [isSuccess])

	useDidMountEffect(() => {
		if (!error) return

		toast.error(
			<Notification
				title="Stake ETH"
				notification="Something went wrong during staking. Please try again or contact us."
			/>
		)
	}, [error])

	const onSubmit = useCallback(
		(
			form: StakeRequestModel,
			formikHelpers: FormikHelpers<StakeRequestModel>
		) => {
			writeContract({
				address: process.env.NEXT_PUBLIC_VAULT_CONTRACT as Hex,
				abi: vaultAbi,
				functionName: 'depositToForwardAddr',
				value: parseEther(form.amount.toString()),
				args: []
			})
			formikHelpers.resetForm({
				values: { amount: 0, maxAmount: rewards }
			})
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
						placeholder="0"
						required
						iconAlign="left"
						icon={
							<IconWrapper>
								<span>ETH</span>
								<EthIcon width="1em" height="100%" />
							</IconWrapper>
						}
					/>

					<FormInfoRow>
						<h3>Receive</h3>
						<p>You will get</p>
					</FormInfoRow>

					<FormRow>
						<IconWrapper>
							<span>akETH</span>
							<AkkoIcon width="1em" height="100%" />
							<ExchangeRate exhangeRate={exhangeRate} />
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
							<StockCurrency
								$amount={exhangeRate}
								$coin="akETH"
								$color="inherit"
							/>
						</div>
					</FormRow>

					<SubmitContainer>
						<ActionButton
							$isBlock
							type="submit"
							$isCta
							$isLoading={isLoading || isPending}
							disabled={
								!formikProps.isValid || formikProps.values.maxAmount === 0
							}>
							Stake
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
