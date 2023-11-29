import { useFormikContext } from 'formik'
import { useEffect } from 'react'

interface Props {
	initial: any
	trigger: boolean
}

const ResetForm = ({ initial, trigger }: Props) => {
	const { resetForm } = useFormikContext()

	useEffect(() => {
		resetForm({ values: initial })
	}, [trigger])

	return null
}

export default ResetForm
