import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { useFormikContext } from 'formik'
import { styled } from 'styled-components'

interface Props {
	exhangeRate: number
}

const ExchangeRate = ({ exhangeRate }: Props) => {
	const { values } = useFormikContext<AllocationRequestModel>()

	const inputName = 'amount'

	return <Container>{values[inputName] * exhangeRate}</Container>
}

const Container = styled.div``

export default ExchangeRate
