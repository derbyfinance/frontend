import { useFormikContext } from 'formik'
import { useEffect } from 'react'

interface Props {
	initial: any
	trigger: number
}

const ResetForm = ({ initial, trigger }: Props) => {
	const { resetForm } = useFormikContext()

	useEffect(() => {
		resetForm({ values: initial })
	}, [trigger, initial, resetForm])

	return null
}

export default ResetForm
