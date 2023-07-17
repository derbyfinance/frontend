import SelectInputField from '@components/form/SelectInputField'
import NetworkIcon from '@components/icons/NetworkIcon'
import { useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getPlayerState } from '@store/UserSlice'
import { FormikProps, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

interface Props {
	formikProps: FormikProps<any>
}

const NetworkSelect = ({ formikProps }: Props) => {
	const { values } = useFormikContext<AllocationRequestModel>()
	const player = useAppSelector<PlayerDtoModel>(getPlayerState)

	const [networkList, setNetworkList] = useState<string[]>([])

	useEffect(() => {
		const list = player?.player.baskets.flatMap(({ vault }) =>
			vault.protocols.map(({ name }) => name.replace(/(\_\w+)/gim, ''))
		)

		setNetworkList(list)
	}, [values])

	return (
		<SelectInputField
			inputName="network"
			label={
				<>
					<NetworkIcon />
					<span>Network</span>
				</>
			}
			formikProps={formikProps}
			placeholder="Select a network"
			tabIndex={2}
			smallOptionList
			optionList={
				networkList?.map((symbol) => ({
					name: symbol,
					value: symbol
				})) ?? []
			}
			// options={
			// 	<NetworkOptions
			// 		optionList={networkList}
			// 		inputName="network"
			// 		formikProps={formikProps}
			// 	/>
			// }
			required
		/>
	)
}

export default NetworkSelect
