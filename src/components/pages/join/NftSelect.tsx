import SelectInputField from '@components/form/SelectInputField'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getAddressState, getPlayerData, getPlayerState } from '@store/UserSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import { Hex } from 'viem'
import { useAccount } from 'wagmi'

interface Props {
	formikProps: FormikProps<any>
}

const NftSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const address = useAppSelector<Hex | undefined>(getAddressState)
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	
	useEffect(() => {
		if (player && player?.player?.baskets.length === 0 && address !== undefined)
			dispatch(getPlayerData(address))
	}, [player])

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
