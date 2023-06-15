import { InputHTMLAttributes, useState } from 'react'

import { ErrorMessage, FormikProps } from 'formik'
import { styled } from 'styled-components'

import ActionButton from '@components/buttons/ActionButton'
import ArrowDropdownIcon from '@components/icons/ArrowDropdownIcon'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	inputName: string
	label: string | JSX.Element
	options: JSX.Element
	formikProps: FormikProps<any>
	placeholder?: string
	required?: boolean
}

export default ({
	inputName,
	label,
	formikProps,
	options,
	placeholder = '',
	required = false,
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
					type="text"
					readOnly
					id={inputName}
					name={inputName}
					placeholder={placeholder}
					required={required}
					onChange={formikProps.handleChange}
					onBlur={formikProps.handleBlur}
					value={formikProps.values[inputName]}
					{...props}
				/>
				<FloatArrowDropdownIcon />
			</Wrapper>
			<OptionOverlay $isOpen={open} onClick={openSelect} />
			<OptionList $isOpen={open}>
				{options}
				<Bottom>
					<ActionButton $isCta onClick={openSelect}>
						Select
					</ActionButton>
				</Bottom>
			</OptionList>
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
		margin-right: 0.5em;
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
const FloatArrowDropdownIcon = styled(ArrowDropdownIcon)`
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
	margin: 1.125em 1em;
	cursor: pointer;
	color: ${({ theme }) => theme.style.colorPlaceholder};
	rotate: 0deg;
	transition: rotate 0.2s ease-in-out;
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
