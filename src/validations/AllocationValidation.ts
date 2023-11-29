import * as Yup from 'yup'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { stripTagsRegex } from './CreateNftValidation'

const AllocationValidation = Yup.object<AllocationRequestModel>({
	protocol: Yup.string().required().matches(stripTagsRegex, 'Standard characters only'),
	vault: Yup.string().required().matches(stripTagsRegex, 'Standard characters only'),
	maxAmount: Yup.number(),
	amount: Yup.number().required().min(1).when(["maxAmount"], ([maxAmount], schema) =>  maxAmount ? schema.max(maxAmount) : schema.max(1000) )
})

export default AllocationValidation