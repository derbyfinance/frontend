import { SelectHTMLAttributes, useCallback, useState } from 'react'

import { ErrorMessage, FormikProps } from 'formik'
import { styled } from 'styled-components'

import ActionButton from '@components/buttons/ActionButton'
import ArrowDropdownIcon from '@components/icons/ArrowDropdownIcon'
import { SelectOptionModel } from '@models/internal/SelectOptionModel'
import { ErrorCaption } from './FormElements'
import SelectOptionList from './SelectOptionList'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	inputName: string
	label: string | JSX.Element
	options?: JSX.Element
	formikProps: FormikProps<any>
	placeholder?: string
	optionList: SelectOptionModel[]
	required?: boolean
	smallOptionList?: boolean
	readOnly?: boolean
}

const SelectInputField = ({
	inputName,
	label,
	formikProps,
	optionList,
	options,
	placeholder = '',
	required = false,
	smallOptionList = false,
	readOnly = false,
	...props
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const openSelect = useCallback((isOpen: boolean): void => {
		if(!readOnly) setIsOpen(!isOpen)
	}, [])

	const closeOptionList = useCallback((): void => {
		if (smallOptionList) setIsOpen(false)
	}, [])

	return (
		<Container>
			<Label htmlFor={inputName}>{label}</Label>
			<Wrapper onClick={() => openSelect(isOpen)}>
				{!readOnly ? <ClickableSelect onClick={() => openSelect(isOpen)} />: null}
				<SelectInput
					disabled
					id={inputName}
					name={inputName}
					required={required}
					onChange={formikProps.handleChange}
					onBlur={formikProps.handleBlur}
					value={formikProps.values[inputName]}
					readOnly={readOnly}
					//{...props}
				>
					{placeholder && (
						<PlaceholderOption value="" disabled>
							{placeholder}
						</PlaceholderOption>
					)}
					{optionList.map(({ name, value }, index) => (
						<option key={index} value={value}>
							{name}
						</option>
					))}
				</SelectInput>
				{!readOnly ? <FloatArrowDropdownIcon $isOpen={isOpen} /> : null }
			</Wrapper>
			<OptionOverlay $isOpen={isOpen} onClick={()=> openSelect(isOpen)} />
			<OptionList
				$isOpen={isOpen}
				$smallOptionList={smallOptionList}
				onClick={closeOptionList}>
				{options ?? (
					<SelectOptionList
						optionList={optionList}
						inputName={inputName}
						formikProps={formikProps}
					/>
				)}
				{!smallOptionList ? (
					<Bottom>
						<ActionButton type="button" $isCta onClick={() => openSelect(isOpen)}>
							Select
						</ActionButton>
					</Bottom>
				) : null}
			</OptionList>
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
		margin-right: 0.5em;
	}
`
const Wrapper = styled.div`
	position: relative;

	&:after {
		content: '';
		display: block;
		position: absolute;
		right: 1px;
		top: 1px;
		height: 95%;
		width: 3em;
		border-radius: ${({ theme }) => theme.style.radius}px;
		background: linear-gradient(
			to right,
			transparent 0%,
			${({ theme }) => theme.style.colorBg} 40%
		);
	}
`
const ClickableSelect = styled.div`
	display: block;
	position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
`
const FloatArrowDropdownIcon = styled(ArrowDropdownIcon)<{ $isOpen: boolean }>`
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

	${({ $isOpen }) =>
		$isOpen &&
		`
		rotate: 180deg;
	`}
`
const SelectInput = styled.select<{readOnly: boolean}>`
	-webkit-appearance: none;
	-moz-appearance: none;
	text-indent: 1px;
	text-overflow: unset;

	font-family: ${({ theme }) => theme.fonts.slabMedium};
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	border-radius: ${({ theme }) => theme.style.radius}px;
	background-color: ${({ theme }) => theme.style.colorBg};
	padding: 0.5em;
	display: block;
	width: 100%;
	cursor: ${({ readOnly }) => readOnly ? 'none' : 'pointer'};
	pointer-events: ${({readOnly}) => readOnly ? 'none' : 'auto'};

	&[disabled] {
		opacity: 1;
	}

	${({ readOnly, theme }) => readOnly && `
		opacity: 0.75;
		color: ${theme.style.colorPlaceholder};
	`}

	&:has(option:disabled:checked) {
		color: ${({ theme }) => theme.style.colorPlaceholder};
	}
`
const OptionList = styled.div<{ $isOpen: boolean; $smallOptionList?: boolean }>`
	background-color: ${({ theme }) => theme.style.colorBg};
	border-radius: ${({ theme }) => theme.style.radius}px;
	border: 1px solid ${({ theme }) => theme.style.colorBorder};
	margin-top: 0.5em;
	padding: ${({ $smallOptionList }) => ($smallOptionList ? '0em' : '2em')};
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
	position: absolute;
	display: none;
	z-index: 2;
	overflow: hidden;
	min-width: 10em;

	${({ $isOpen }) =>
		$isOpen &&
		`
		display: block;
	`};
`
const PlaceholderOption = styled.option``
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
export default SelectInputField
