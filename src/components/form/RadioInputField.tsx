import { InputHTMLAttributes } from 'react'

import { FormikProps } from 'formik'
import { styled } from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	inputName: string
	value: string
	formikProps: FormikProps<any>
}
export default ({ inputName, value, formikProps, ...props }: Props) => {
	return (
		<RadioInput
			type="radio"
			name={inputName}
			onChange={formikProps.handleChange}
			onBlur={formikProps.handleBlur}
			value={value}
			{...props}
		/>
	)
}

const RadioInput = styled.input`
	width: 1em;
	height: 1em;
`
