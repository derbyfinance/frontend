import Table from '@components/table/Table'
import { useAppSelector } from '@hooks/ReduxStore'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getAllocationListState } from '@store/RaceSlice'
import { styled } from 'styled-components'
import AllocationBoardRow from './AllocationBoardRow'
import ActionButton from '@components/buttons/ActionButton'

interface Props {
   children: JSX.Element
}

const AllocationBoard = () => {
    const allocationList: AllocationRequestModel[] = [
        {
            nft: '',
            network: 'USDC yVault (USDC)',
            protocol: 'Yearn Finance',
            vault: '',
            maxAmount: 11.6,
            category: '',
            amount: 1152360
        },
         {
            nft: '',
            network: 'USD Coin',
            protocol: 'Aave',
            vault: '',
            maxAmount: 9.35,
            category: '',
            amount: 925650
        },
         {
            nft: '',
            network: 'dUSDC',
            protocol: 'Gearbox',
            vault: '',
            maxAmount: 7.51,
            category: '',
            amount: 743490
        },
         {
            nft: '',
            network: 'fUSDC',
            protocol: 'Harvest Finance',
            vault: '',
            maxAmount: 2.9,
            category: '',
            amount: 287100
        }
    ] 
    
    const headers: TableHeaderModel[] = [
        { name: 'LP Token' },
		{ name: 'Protocol' },
		{ name: 'Weight', align: 'right' },
		{ name: 'Value', align: 'right' }
    ]
    
    return (
      <Container>
            <Table
                $isSmall={true}
                headers={headers}
                footer={ <ActionButton $isGhost $align="right">Rebalance your allocation</ActionButton>}
            >
				{allocationList?.map((allocation, index) => (
					<AllocationBoardRow key={index} allocation={allocation} />
				))}
			</Table>
		</Container>
   )
}

const Container = styled.div`
    flex: 1 1 auto;
`

export default AllocationBoard