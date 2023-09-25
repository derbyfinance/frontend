import { useAppSelector } from '@hooks/ReduxStore'
import CategoryDtoModel from '@models/dto/CategoryDtoModel'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getCategoryListState } from '@store/RaceSlice'
import { getPlayerState } from '@store/UserSlice'
import { useFormikContext } from 'formik'
import { useCallback, useEffect } from 'react'

const CategoryHiddenInput = () => {
	const { handleChange, values, setFieldValue } =
		useFormikContext<AllocationRequestModel>()
	const categoryList = useAppSelector<CategoryDtoModel[] | undefined>(
		getCategoryListState
	)
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	const inputName = 'category'

	useEffect(() => {
		if (player && player.player?.baskets.length > 0) {
			const category =
				player.player.baskets.find(({ id }) => id === values['nft'])?.vault
					.category ?? ''

			setFieldValue(inputName, categoryFilter(category))
		}
	}, [values])

	//TODO: Ugly
	const categoryFilter = useCallback((category: string): string => {
		return categoryList?.find(({ name }) => name === category)?.id ?? ''
	}, [])

	return (
		<input
			type="hidden"
			id={inputName}
			name={inputName}
			required={true}
			onChange={handleChange}
			value={values[inputName]}
		/>
	)
}

export default CategoryHiddenInput
