import SelectInputField from '@components/form/SelectInputField'
import VaultIcon from '@components/icons/VaultIcon'
import { useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel, ProtocolDtoModel } from '@models/dto/PlayerDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getPlayerState } from '@store/UserSlice'
import { FormikProps, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

interface Props {
	formikProps: FormikProps<any>
}

const ProtocolSelect = ({ formikProps }: Props) => {
	const { values } = useFormikContext<AllocationRequestModel>()
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)

	const [protocolList, setProtocolList] = useState<ProtocolDtoModel[]>()

	useEffect(() => {
		const list = player?.player.baskets.find(({ id }) => id === values.nft)
			?.vault.protocols
		setProtocolList(list)
	}, [values])

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
			optionList={
				protocolList?.map(({ protocol, id }) => ({
					name: protocol,
					value: id
				})) ?? []
			}
			required
		/>
	)
}

export default ProtocolSelect
