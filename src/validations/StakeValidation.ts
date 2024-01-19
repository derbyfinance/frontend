import * as Yup from 'yup'

import { stripTagsRegex } from './CreateNftValidation'
import StakeRequestModel from '@models/requests/StakeRequestModel'

const StakeValidation = Yup.object<StakeRequestModel>({
	//nft: Yup.string().required().matches(stripTagsRegex, 'Standard characters only'),
	maxAmount: Yup.number(),
	amount: Yup.number().required().min(1).when(["maxAmount"], ([maxAmount], schema) =>  maxAmount ? schema.max(maxAmount) : schema.max(1000) )
})

export default StakeValidation