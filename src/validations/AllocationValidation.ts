import * as Yup from 'yup'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

const AllocationValidation = Yup.object<AllocationRequestModel>({

	network: Yup.string().required(),
	vault: Yup.string().required(),
	maxAmount: Yup.number(),
	amount: Yup.number().required().min(1).when(["maxAmount"], ([maxAmount], schema) =>  maxAmount ? schema.max(maxAmount) : schema.max(1000) )
})

export default AllocationValidation