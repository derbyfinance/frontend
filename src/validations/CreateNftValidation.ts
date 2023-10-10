import * as Yup from 'yup'

import CreateNftRequestModel from '@models/requests/CreateNftRequestModel'

export const stripTagsRegex = /^[a-zA-Z0-9\s]*$/

const CreateNftValidation = Yup.object<CreateNftRequestModel>({
	name: Yup.string().required().min(3).matches(stripTagsRegex, 'Standard characters only'),
	category: Yup.string().required().matches(stripTagsRegex, 'Standard characters only'),
	coin: Yup.string().required().matches(stripTagsRegex, 'Standard characters only')
})

export default CreateNftValidation