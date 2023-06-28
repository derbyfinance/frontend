import * as Yup from 'yup'

import AllocationRequestModel from '@models/requests/AllocationRequestModel'

const AllocationValidation = Yup.object<AllocationRequestModel>({
	network: Yup.string().required(),
	vault: Yup.string().required(),
	amount: Yup.number().required().min(10).max(10000)
})
//.shape({
// 	network: Yup.string().required(),
// 	message: Yup.string().required(),
// 	email: Yup.string().email().required()
// })

export default AllocationValidation