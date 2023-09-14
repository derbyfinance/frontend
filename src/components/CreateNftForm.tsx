import Notification from '@components/Notification'
import { useAppDispatch } from '@hooks/ReduxStore'
import useDebounce from '@hooks/UseDebounce'
import useMintBasket from '@hooks/UseMintNewBasket'
import CreateNftRequestModel from '@models/requests/CreateNftRequestModel'
import { getPlayerData } from '@store/UserSlice'
import CreateNftValidation from '@validations/CreateNftValidation'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Abi } from 'viem'
import { useAccount } from 'wagmi'
import CategorySelect from './CategorySelect'
import CoinSelect from './CoinSelect'
import ActionButton from './buttons/ActionButton'
import { FormRow, SubmitContainer } from './form/FormElements'
import InputField from './form/InputField'

interface Props {
	closeModal: VoidFunction
}

const abi: Abi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_vaultNumber',
				type: 'uint256'
			}
		],
		name: 'mintNewBasket',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

const CreateNftForm = ({ closeModal }: Props) => {
	const dispatch = useAppDispatch()
	const { address } = useAccount()

	const initial: CreateNftRequestModel = {
		name: '',
		category: '',
		coin: '0'
	}
	const [token, setToken] = useState<CreateNftRequestModel>(initial)

	const debouncedToken = useDebounce(token, 500)

	const { errorPrepare, isSuccessPrepare, errorTx, isSuccessTx, write } =
		useMintBasket(parseInt(debouncedToken.coin), debouncedToken.name)

	useEffect(() => {
		if (errorPrepare || errorTx) {
			toast.error(
				<Notification
					title="Create NFT"
					notification="Something went wrong during the creation of the NFT. Please try again."
				/>
			)
		}
	}, [errorTx, errorPrepare])

	useEffect(() => {
		if (isSuccessPrepare && isSuccessTx) {
			toast.success(
				<Notification
					title="Create NFT"
					notification="The NFT is created succesfully."
				/>
			)

			dispatch(getPlayerData(address!))

			closeModal()
		}
	}, [isSuccessPrepare, isSuccessTx])

	useEffect(() => {
		if (isSuccessPrepare) {
			write?.()
		}
	}, [isSuccessPrepare])

	const onSubmit = (
		form: CreateNftRequestModel,
		formikHelpers: FormikHelpers<CreateNftRequestModel>
	): void => {
		setToken(form)

		// formikHelpers.resetForm({
		// 	values: {
		// 		coin: '',
		// 		category: '',
		// 		name: ''
		// 	}
		// })
	}

	return (
		<Formik
			initialValues={initial}
			validationSchema={CreateNftValidation}
			validateOnMount={false}
			enableReinitialize
			onSubmit={onSubmit}>
			{(formikProps: FormikProps<CreateNftRequestModel>) => (
				<Form noValidate>
					<InputField
						inputName="name"
						label="name NFT"
						placeholder="Wagmi borrowing"
						formikProps={formikProps}
					/>
					<FormRow>
						<CategorySelect formikProps={formikProps} />

						<CoinSelect formikProps={formikProps} />
					</FormRow>
					<SubmitContainer>
						<ActionButton
							$isGhost
							$isBlock
							type="submit"
							disabled={!formikProps.isValid}>
							Create NFT
						</ActionButton>
					</SubmitContainer>
				</Form>
			)}
		</Formik>
	)
}

export default CreateNftForm
