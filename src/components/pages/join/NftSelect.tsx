import SelectInputField from '@components/form/SelectInputField'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getPlayerData, getPlayerState } from '@store/UserSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

interface Props {
	formikProps: FormikProps<any>
}

const NftSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const { player } = useAppSelector<PlayerDtoModel>(getPlayerState)
	const { address } = useAccount()

	useEffect(() => {
		if (player && player.baskets.length === 0 && address !== undefined)
			dispatch(getPlayerData(address))
	}, [])

	return (
		<SelectInputField
			inputName="nft"
			label="Select NFT"
			formikProps={formikProps}
			placeholder="Select a NFT"
			smallOptionList
			tabIndex={1}
			optionList={
				player?.baskets
					? player.baskets.map(({ id, vault }) => ({
							name: vault.name,
							value: id
					  }))
					: []
			}
			required
		/>
	)
}

export default NftSelect
