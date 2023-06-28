import CreateNftValidation from '@/validations/CreateNftValidation'
import CreateNftRequestModel from '@models/requests/CreateNftRequestModel'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import CategorySelect from './CategorySelect'
import CoinSelect from './CoinSelect'
import ActionButton from './buttons/ActionButton'
import { FormRow, SubmitContainer } from './form/FormElements'
import InputField from './form/InputField'

interface Props {}

const CreateNftForm = ({}: Props) => {
	const initial: CreateNftRequestModel = {
		name: '',
		category: '',
		coin: ''
	}

	const onSubmit = (
		form: CreateNftRequestModel,
		formikHelpers: FormikHelpers<CreateNftRequestModel>
	): void => {}

	return (
		<Formik
			initialValues={initial}
			validationSchema={CreateNftValidation}
			isInitialValid={false}
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
