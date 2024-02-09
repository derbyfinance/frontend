import { tokenAbi } from '@/abis/tokenAbi'
import { vaultAbi } from '@/abis/vaultAbi'
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
import StakeRequestModel from '@models/requests/StakeRequestModel'
import { getAddressState, isConnectedState } from '@store/UserSlice'
import StakeValidation from '@validations/StakeValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Hex, formatEther, parseEther } from 'viem'
import { sepolia } from 'viem/chains'
import {
	BaseError,
	useChainId,
	useReadContract,
	useSwitchChain,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi'
import MaxAmountHiddenInput from '../join/MaxAmountHiddenInput'

const StakeForm = () => {
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const isConnected = useAppSelector<boolean>(isConnectedState)
	const rewards = useDerbyTokenBalance(address)

	const [balance, setBalance] = useState<number>(0)
	const [amount, setAmount] = useState<number>(0)
	const [isApproved, setIsApproved] = useState<boolean>(false)

	const initial: StakeRequestModel = {
		nft: '',
		amount: 0,
		maxAmount: 0
	}

	useEffect(() => {
		setBalance(rewards)
	}, [rewards])

	// CODE ADDED start //
	const { switchChain } = useSwitchChain()
	const chainId = useChainId()

	// Will prompt to switch chains when wallet is not connected to sepolia
	// Probably not in the right place
	useEffect(() => {
		if (chainId != sepolia.id) {
			switchChain({ chainId: sepolia.id })
		}
	}, [])

	const { data: hash, error, isPending, writeContract } = useWriteContract()

	// Will trigger the deposit tx and pop up metamask
	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const amount = formData.get('value') as string
		writeContract({
			address: process.env.NEXT_PUBLIC_VAULT_CONTRACT as Hex,
			abi: vaultAbi,
			functionName: 'depositToForwardAddr',
			value: parseEther(amount)
		})
	}

	// Waiting for result
	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash
		})

	// Get token balance in vault
	// should use refetch when TX is complete
	const { data: tokenBalance, refetch } = useReadContract({
		abi: tokenAbi,
		address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT as Hex,
		functionName: 'balanceOf',
		args: [address]
	})

	// formats amount to ETH
	console.log(`Token balance ${formatEther(tokenBalance)}`)

	// CODE ADDED end //

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
		<>
			{
				// Temp form start
			}
			<form onSubmit={submit}>
				<input name="value" placeholder="ETH: 0" required />
				<button disabled={isPending} type="submit">
					{isPending ? 'Confirming...' : 'Deposit'}
				</button>
				{hash && <div>Transaction Hash: {hash}</div>}
				{isConfirming && <div>Waiting for confirmation...</div>}
				{isConfirmed && <div>Transaction confirmed.</div>}
				{error && (
					<div>Error: {(error as BaseError).shortMessage || error.message}</div>
				)}
			</form>
			{
				// Temp form end
			}
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
									<StockCurrency
										$amount={balance}
										$coin="ETH"
										$color="inherit"
									/>
								</>
							}
							labelAlign="right"
							tabIndex={5}
							formikProps={formikProps}
							placeholder="0"
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

						<FormInfoRow>
							<h3>Receive</h3>
							<p>You will get</p>
						</FormInfoRow>

						<FormRow>
							<IconWrapper>
								<span>akETH</span>
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
								// $isLoading={isLoadingApprove || isLoadingPrepare || isLoadingTx}
								disabled={
									!formikProps.isValid || formikProps.values.maxAmount === 0
								}>
								{isApproved ? 'Stake ETH' : 'Stake'}
							</ActionButton>
						</SubmitContainer>
					</Form>
				)}
			</Formik>
		</>
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
