import Avatar from '@components/Avatar'
import IconSelector from '@components/IconSelector'
import LinkButton from '@components/buttons/LinkButton'
import TableData from '@components/table/TableData'
import TableRow from '@components/table/TableRow'
import { VaultDtoModel } from '@models/dto/PlayerDtoModel'
import { styled } from 'styled-components'

interface Props {
	vault: VaultDtoModel
}

export default ({ vault }: Props) => {
	return (
		<TableRow>
			<TableData>
				<Avatar name="" icon={<IconSelector name={vault.coin} />} />
			</TableData>
			<TableData align="left" $focus>
				{vault.name} <Network>{vault.network}</Network>
			</TableData>
			<TableData align="right">
				{/* {ToCurrency(vault.allocated, 2, true)} */}
			</TableData>
			<TableData align="right">{/* {vault.performance}% */}</TableData>
			<TableData align="right">
				<LinkButton $isGhost href={`/race/join/${vault.coin}/${vault.network}`}>
					+Invest
				</LinkButton>
			</TableData>
		</TableRow>
	)
}

const Network = styled.span`
	font-family: ${({ theme }) => theme.fonts.robotoBold};
	font-size: 0.875rem;
	color: ${({ theme }) => theme.style.colorLabel};
`
