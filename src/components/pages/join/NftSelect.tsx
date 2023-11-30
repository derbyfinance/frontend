import SelectInputField from '@components/form/SelectInputField'
import { useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getPlayerState } from '@store/UserSlice'
import { FormikProps } from 'formik'

interface Props {
	formikProps: FormikProps<any>
}

const NftSelect = ({ formikProps }: Props) => {
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)

	return (
		<SelectInputField
			inputName="nft"
			label="Select NFT"
			formikProps={formikProps}
			placeholder="Select a NFT"
			smallOptionList
			readOnly
			tabIndex={1}
			optionList={
				player?.player?.baskets
					? player.player.baskets.map(({ id, name }, index) => ({
							name: name,
							value: id,
							disabled: index > 0
					  }))
					: []
			}
			required
		/>
	)
}

export default NftSelect
