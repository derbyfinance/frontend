import IconSelector from '@components/IconSelector'
import DeleteIcon from '@components/icons/DeleteIcon'
import EditIcon from '@components/icons/EditIcon'
import TableData from '@components/table/TableData'
import { AllocationRequestModel } from '@models/requests/AllocationRequestModel'
import { styled } from 'styled-components'

interface Props {
	index: number
	allocate: AllocationRequestModel
	remove: (index: number) => void
	update: (index: number) => void
}

export default ({ index, allocate, remove, update }: Props) => {
	return (
		<TableRowBar>
			<TableData width="5%">
				<IconWrapper>
					<VaultIcon>
						<IconSelector name={allocate.vault} />
					</VaultIcon>
					<NetworkIcon>
						<IconSelector name={allocate.network} />
					</NetworkIcon>
				</IconWrapper>
			</TableData>
			<TableData width="*">
				{allocate.vault} <Network>{allocate.network}</Network>
			</TableData>
			<TableData width="15%" align="right">
				{allocate.amount.toLocaleString()}&nbsp;<Network>DRB</Network>
			</TableData>
			<TableData width="10%" align="right">
				66%
			</TableData>
			<TableData width="5%">
				<ConfigButton onClick={() => update(index)}>
					<EditIcon />
				</ConfigButton>
			</TableData>
			<TableData width="5%">
				<ConfigButton onClick={() => remove(index)}>
					<DeleteIcon />
				</ConfigButton>
			</TableData>
		</TableRowBar>
	)
}

const TableRowBar = styled.tr`
	td:first-child,
	th:first-child {
		border-top-left-radius: ${({ theme }) => theme.style.radius}px;
		border-bottom-left-radius: ${({ theme }) => theme.style.radius}px;
	}

	td:last-child,
	th:last-child {
		border-top-right-radius: ${({ theme }) => theme.style.radius}px;
		border-bottom-right-radius: ${({ theme }) => theme.style.radius}px;
	}

	background-color: ${({ theme }) => theme.style.colorInfo};
`
const IconWrapper = styled.div`
	width: 2em;
	height: 2em;
	position: relative;
`
const VaultIcon = styled.div`
	width: 1.75em;
	height: 1.75em;
	position: absolute;
	border-radius: 1em;
	top: 0;
	left: 0;

	> svg {
		display: block;
	}
`
const NetworkIcon = styled.div`
	width: 1em;
	height: 1em;
	position: absolute;
	border-radius: 1em;
	background-color: ${({ theme }) => theme.style.buttonColor};
	z-index: 1;
	bottom: 0;
	right: 0;
	overflow: hidden;
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);

	> svg {
		display: block;
	}
`

const Network = styled.span`
	font-family: ${({ theme }) => theme.fonts.robotoMedium};
	font-size: 0.75rem;
	color: ${({ theme }) => theme.style.colorLink};
`
const ConfigButton = styled.button`
	display: block;
	color: ${({ theme }) => theme.style.colorLink};
	cursor: pointer;
	> svg {
		display: block;
	}
`
