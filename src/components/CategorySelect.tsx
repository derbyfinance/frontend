import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import CategoryDtoModel from '@models/dto/CategoryDtoModel'
import { getCategoryListData, getCategoryListState } from '@store/RaceSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import SelectInputField from './form/SelectInputField'

interface Props {
	formikProps: FormikProps<any>
}

const CategorySelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const categoryList = useAppSelector<CategoryDtoModel[]>(getCategoryListState)

	useEffect(() => {
		dispatch(getCategoryListData())
	}, [])

	return (
		<SelectInputField
			inputName="category"
			label="Category"
			smallOptionList
			placeholder="Select a category"
			formikProps={formikProps}
			optionList={categoryList.map(({ name, id }) => ({
				name: name,
				value: id
			}))}
		/>
	)
}

export default CategorySelect
