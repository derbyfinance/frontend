import Notification from '@components/Notification'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import useDebounce from '@hooks/UseDebounce'
import useMintBasket from '@hooks/UseMintNewBasket'
import CreateNftRequestModel from '@models/requests/CreateNftRequestModel'
import { getAddressState, getPlayerData } from '@store/UserSlice'
import CreateNftValidation from '@validations/CreateNftValidation'
import { Form, Formik, FormikProps } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Hex } from 'viem'
import CoinSelect from './CoinSelect'
import ActionButton from './buttons/ActionButton'
import { SubmitContainer } from './form/FormElements'
import InputField from './form/InputField'
import ResetForm from './form/ResetForm'

interface Props {
	isOpen: boolean
	closeModal: VoidFunction
}

const CreateNftForm = ({ closeModal, isOpen }: Props) => {
	const dispatch = useAppDispatch()
	const address = useAppSelector<Hex | undefined>(getAddressState)

	const initial: CreateNftRequestModel = {
		name: '',
		coin: '0'
	}
	const [token, setToken] = useState<CreateNftRequestModel>(initial)

	const debouncedToken = useDebounce<CreateNftRequestModel>(token, 500)

	const {
		data,
		errorPrepare,
		isSuccessPrepare,
		errorTx,
		isSuccessTx,
		isLoadingPrepare,
		isLoadingTx,
		write
	} = useMintBasket(parseInt(debouncedToken.coin), debouncedToken.name)

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
			write?.(data!.request)
		}
	}, [isSuccessPrepare])

	const onSubmit = useCallback((form: CreateNftRequestModel): void => {
		setToken(form)
	}, [])

	return (
		<Formik
			initialValues={initial}
			validationSchema={CreateNftValidation}
			validateOnMount={false}
			isInitialValid={false}
			onSubmit={onSubmit}>
			{(formikProps: FormikProps<CreateNftRequestModel>) => (
				<Form noValidate>
					<ResetForm initial={initial} trigger={isOpen} />
					<InputField
						inputName="name"
						label="Name NFT"
						placeholder="Wagmi borrowing"
						formikProps={formikProps}
					/>

					<CoinSelect formikProps={formikProps} />

					<SubmitContainer>
						<ActionButton
							$isGhost
							$isBlock
							type="submit"
							$isLoading={isLoadingPrepare || isLoadingTx}
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
