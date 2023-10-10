import { InputHTMLAttributes, useCallback, useState } from 'react'

import { ErrorMessage, FormikProps } from 'formik'
import { styled } from 'styled-components'

import { InputType } from '@datatypes/InputType'
import { ErrorCaption } from './FormElements'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	inputName: string
	label: string | JSX.Element
	formikProps: FormikProps<any>
	placeholder?: string
	type?: InputType
	required?: boolean
	icon?: string | JSX.Element
}

const InputField = ({
	inputName,
	label,
	formikProps,
	placeholder = '',
	required = false,
	type = 'text',
	icon,
	...props
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const openSelect = useCallback((isOpen: boolean) => {
		setIsOpen(!isOpen)
	}, [])

	return (
		<Container>
			<Label htmlFor={inputName}>{label}</Label>
			<Wrapper onClick={() => openSelect(isOpen)} $isOpen={isOpen}>
				<TextInput
					type={type}
					id={inputName}
					name={inputName}
					placeholder={placeholder}
					required={required}
					onChange={formikProps.handleChange}
					onBlur={formikProps.handleBlur}
					value={formikProps.values[inputName]}
					{...props}
				/>
				<FloatIcon>{icon}</FloatIcon>
			</Wrapper>

			<ErrorCaption>
				{formikProps.touched &&
				formikProps.errors &&
				formikProps.values[inputName] === '' ? null : (
					<ErrorMessage name={inputName} />
				)}
			</ErrorCaption>
		</Container>
	)
}

const Container = styled.div``

const Label = styled.label`
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	font-size: 1.25em;
	vertical-align: middle;
	margin: 0.75em 0;
	display: block;

	> svg {
		display: inline-block;
		margin-right: 0.5em;
		vertical-align: middle;
	}
`
const Wrapper = styled.div<{ $isOpen: boolean }>`
	position: relative;

	${({ $isOpen }) =>
		$isOpen &&
		`
		> svg {
			rotate: 180deg;
		}
	`}
`
const FloatIcon = styled.div`
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	//width: 1.5em;
	height: 1.5em;
	z-index: 1;
	margin: 0.625em;
`
const TextInput = styled.input`
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	background-color: ${({ theme }) => theme.style.colorBg};
	padding: 0.5em;
	display: block;
	width: 100%;
	cursor: pointer;

	&::placeholder {
		font-family: ${({ theme }) => theme.fonts.slabLight};
		color: ${({ theme }) => theme.style.colorPlaceholder};
		opacity: 1;
	}
`
export default InputField