import SelectInputField from '@components/form/SelectInputField'
import NetworkIcon from '@components/icons/NetworkIcon'
import { useAppDispatch } from '@hooks/ReduxStore'
import { NetworkDtoModel } from '@models/dto/NetworkDtoModel'
import { getNetworkListData, getNetworkListState } from '@store/RaceSlice'
import { AppState } from '@store/Store'
import { FormikProps } from 'formik'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import NetworkOptions from './NetworkOptions'

interface Props {
	formikProps: FormikProps<any>
}

const NetworkSelect = ({ formikProps }: Props) => {
	const dispatch = useAppDispatch()
	const networkList = useSelector<AppState, NetworkDtoModel[]>(
		getNetworkListState
	)

	useEffect(() => {
		if (networkList && networkList.length === 0) dispatch(getNetworkListData())
	}, [])

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
			optionList={networkList.map(({ name, symbol }) => ({
				name: name,
				value: symbol
			}))}
			options={
				<NetworkOptions
					optionList={networkList}
					inputName="network"
					formikProps={formikProps}
				/>
			}
			required
		/>
	)
}

export default NetworkSelect
