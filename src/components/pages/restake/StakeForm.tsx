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
import useDerbyTokenBalance from '@hooks/UseDerbyTokenBalance'
import StakeRequestModel from '@models/requests/StakeRequestModel'
import StakeValidation from '@validations/StakeValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import MaxAmountHiddenInput from '../join/MaxAmountHiddenInput'
import PercentageBar from '../join/PercentageBar'

const StakeForm = () => {
	const rewards = useDerbyTokenBalance()
	const [balance, setBalance] = useState<number>(0)

	const initial: StakeRequestModel = {
		nft: '',
		amount: 0,
		maxAmount: 0
	}

	useEffect(() => {
		setBalance(rewards)
	}, [rewards])

	const onSubmit = useCallback(
		(
			form: StakeRequestModel,
			formikHelpers: FormikHelpers<StakeRequestModel>
		) => {
			form.amount = Number(form.amount)
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
						icon={
							<IconWrapper>
								<span>ETH</span>
								<EthIcon width="1em" height="100%" />
							</IconWrapper>
						}
					/>
					<PercentageBar />

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
							disabled={
								!formikProps.isValid || formikProps.values.maxAmount === 0
							}>
							Stake ETH
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
