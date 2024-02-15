import { InputHTMLAttributes, useCallback, useState } from 'react'

import { ErrorMessage, FormikProps } from 'formik'
import { styled } from 'styled-components'

import Badge from '@components/buttons/Badge'
import { AlignType } from '@datatypes/AlignType'
import { InputType } from '@datatypes/InputType'
import { ErrorCaption } from './FormElements'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	inputName: string
	label: string | JSX.Element
	labelAlign?: AlignType
	formikProps: FormikProps<any>
	placeholder?: string
	type?: InputType
	required?: boolean
	icon?: string | JSX.Element
	iconAlign?: AlignType
	maxValue?: number
	isConnected?: boolean
}

const InputField = ({
	inputName,
	label,
	labelAlign = 'left',
	formikProps,
	placeholder = '',
	required = false,
	type = 'text',
	icon,
	iconAlign = 'right',
	maxValue,
	isConnected,
	...props
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const openSelect = useCallback((isOpen: boolean) => {
		setIsOpen(!isOpen)
	}, [])

	const handleMaxValue = useCallback(
		(e: any) => {
			formikProps.values[inputName] = maxValue
			formikProps.handleBlur(e)
		},
		[maxValue, formikProps, inputName]
	)

	return (
		<Container>
			<Label htmlFor={inputName} $align={labelAlign}>
				{label}
			</Label>
			<Wrapper onClick={() => openSelect(isOpen)} $isOpen={isOpen}>
				<TextInput
					type={type}
					id={inputName}
					name={inputName}
					placeholder={placeholder}
					required={required}
					onChange={formikProps.handleChange}
					onBlur={formikProps.handleBlur}
					value={
						formikProps.values[inputName] !== 0
							? formikProps.values[inputName]
							: ''
					}
					$align={iconAlign}
					{...props}
				/>
				<FloatIcon $align={iconAlign}>{icon}</FloatIcon>
				{maxValue !== undefined ? (
					<FloatBadge
						name={inputName}
						percentage={100}
						disabled={!isConnected}
						onClick={(e) => handleMaxValue(e)}
					/>
				) : null}
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

const FloatBadge = styled(Badge)`
	position: absolute;
	top: 0.5em;
	right: 0.5em;
`
const Label = styled.label<{ $align: AlignType }>`
	font-family: ${({ theme }) => theme.fonts.slabRegular};
	font-size: 1.25em;
	margin: 0.75em 0;
	display: block;

	${({ $align }) =>
		$align === 'right' &&
		`
		text-align: right;
		font-family: inherit;
		font-size: inherit;
		margin: 0.25em 0;
	'`}

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
const FloatIcon = styled.div<{ $align: AlignType }>`
	display: block;
	position: absolute;
	top: 0;
	${({ $align }) =>
		$align === 'left' &&
		`
		left: 0;
	`}
	${({ $align }) =>
		$align === 'right' &&
		`
		right: 0;
	`}
	height: 1.5em;
	z-index: 1;
	margin: 0.625em;
`
const TextInput = styled.input<{ $align: AlignType }>`
	font-family: ${({ theme }) => theme.fonts.slabMedium};
	border: 1px solid ${({ theme }) => theme.style.formInputBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	background-color: ${({ theme }) => theme.style.formInputBg};
	padding: 0.5em;
	${({ $align }) =>
		$align === 'left' &&
		`
		padding-left: 4.5em;
		`}
	${({ $align }) =>
		$align === 'right' &&
		`
		padding-right: 4.5em;
		`}
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
