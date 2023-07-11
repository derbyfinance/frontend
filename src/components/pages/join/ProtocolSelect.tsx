import SelectInputField from '@components/form/SelectInputField'
import VaultIcon from '@components/icons/VaultIcon'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getPlayerData, getPlayerState } from '@store/UserSlice'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

interface Props {
	formikProps: FormikProps<any>
}

const ProtocolSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const player = useAppSelector<PlayerDtoModel>(getPlayerState)
	const { address } = useAccount()

	useEffect(() => {
		if (player && player?.player.baskets.length === 0 && address !== undefined)
			dispatch(getPlayerData(address))

		console.log(player)
	}, [])

	return (
		<SelectInputField
			inputName="protocol"
			label={
				<>
					<VaultIcon />
					<span>Protocol</span>
				</>
			}
			formikProps={formikProps}
			placeholder="Select a protocol"
			smallOptionList
			tabIndex={3}
			optionList={[].map(({ name, value }) => ({
				name: name,
				value: value
			}))}
			required
		/>
	)
}

export default ProtocolSelect
