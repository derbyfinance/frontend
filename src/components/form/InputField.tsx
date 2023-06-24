import { InputHTMLAttributes, useState } from 'react'

import { ErrorMessage, FormikProps } from 'formik'
import { styled } from 'styled-components'

import { InputType } from '@datatypes/InputType'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	inputName: string
	label: string | JSX.Element
	formikProps: FormikProps<any>
	placeholder?: string
	type?: InputType
	required?: boolean
	icon?: string | JSX.Element
}

export default ({
	inputName,
	label,
	formikProps,
	placeholder = '',
	required = false,
	type = 'text',
	icon,
	...props
}: Props) => {
	const [open, setOpen] = useState<boolean>(false)

	const openSelect = () => {
		setOpen(!open)
	}

	return (
		<Container>
			<Label htmlFor={inputName}>{label}</Label>
			<Wrapper onClick={openSelect} $isOpen={open}>
				<SelectInput
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

			<div className="absolute text-red-500 text-sm">
				{formikProps.touched &&
				formikProps.errors &&
				formikProps.values[inputName] === '' ? null : (
					<ErrorMessage name={inputName} />
				)}
			</div>
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
const SelectInput = styled.input`
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	background-color: ${({ theme }) => theme.style.colorBg};
	padding: 0.5em;
	display: block;
	width: 100%;
	cursor: pointer;

	&::placeholder {
		color: ${({ theme }) => theme.style.colorPlaceholder};
		opacity: 1;
	}
`
const OptionList = styled.div<{ $isOpen: boolean }>`
	background-color: ${({ theme }) => theme.style.colorBg};
	border-radius: ${({ theme }) => theme.style.radius}px;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	margin-top: 0.5em;
	padding: 2em;
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
	position: absolute;
	display: none;
	z-index: 2;
	overflow: hidden;

	${({ $isOpen }) =>
		$isOpen &&
		`
		display: block;
	`};
`
const OptionOverlay = styled.div<{ $isOpen: boolean }>`
	position: absolute;
	//background: rgba(0, 0, 0, 0.25);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: none;
	z-index: 1;

	${({ $isOpen }) =>
		$isOpen &&
		`
		display: block;
	`};
`
const Bottom = styled.div`
	margin-top: 1em;
	text-align: right;
`
