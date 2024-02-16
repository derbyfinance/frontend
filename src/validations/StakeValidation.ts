import * as Yup from 'yup'

import StakeRequestModel from '@models/requests/StakeRequestModel'

const StakeValidation = Yup.object<StakeRequestModel>({
	maxAmount: Yup.number(),
	amount: Yup.number()
		.required()
		.min(0.00000001)
		.when(['maxAmount'], ([maxAmount], schema) =>
			maxAmount ? schema.max(maxAmount) : schema.max(1000)
		)
})

export default StakeValidation
