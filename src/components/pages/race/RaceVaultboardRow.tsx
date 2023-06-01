import { styled } from 'styled-components'

import { ToCurrency } from '@functions/CurrencyFunction'

import { VaultDtoModel } from '@models/dto/VaultDtoModel'

import Avatar from '@components/Avatar'
import IconSelector from '@components/IconSelector'
import ActionButton from '@components/buttons/ActionButton'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'

interface Props {
	vault: VaultDtoModel
}
export default ({ vault }: Props) => {
	const handleFollow = (id: string): void => {
		console.log('error', 'follow', id)
	}

	return (
		<TableRow>
			<TableData>
				<Avatar name="" icon={<IconSelector name={vault.symbol} />} />
			</TableData>
			<TableData align="left" $focus>
				{vault.name} <Network>{vault.network}</Network>
			</TableData>
			<TableData align="right">
				{ToCurrency(vault.allocated, 2, true)}
			</TableData>
			<TableData align="right">{vault.performance}%</TableData>
			<TableData align="right">
				<ActionButton $isGhost onClick={() => handleFollow(vault.id)}>
					+Invest
				</ActionButton>
			</TableData>
		</TableRow>
	)
}

const Network = styled.span`
	font-family: ${({ theme }) => theme.fonts.robotoBold};
	font-size: 0.875rem;
	color: ${({ theme }) => theme.style.colorLabel};
`
