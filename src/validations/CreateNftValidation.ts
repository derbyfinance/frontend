import * as Yup from 'yup'

import CreateNftRequestModel from '@models/requests/CreateNftRequestModel'

const CreateNftValidation = Yup.object<CreateNftRequestModel>({
	name: Yup.string().required().min(3),
	category: Yup.string().required(),
	coin: Yup.string().required()
})

export default CreateNftValidation