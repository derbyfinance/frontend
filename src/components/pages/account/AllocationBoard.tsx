import Table from '@components/table/Table'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import TableHeaderModel from '@models/internal/TableHeaderModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { styled } from 'styled-components'
import AllocationBoardRow from './AllocationBoardRow'
import ActionButton from '@components/buttons/ActionButton'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import { getPlayerData, getPlayerState } from '@store/UserSlice'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const AllocationBoard = () => {
    const dispatch = useAppDispatch()
    const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
    const [allocationList, setAllocationList] = useState<AllocationRequestModel[]>([])
    
    useEffect(() => { 
        if (player && player?.player?.baskets.length > 0) { 
            const allocations: string[] = player.player.baskets[0].allocations
    
            const list:AllocationRequestModel[] = player.player.baskets[0].vault.protocols.map((protocol) => {

                const amount = Number(allocations[Number(protocol.number)])
                return {
                    nft: '',
                    network: protocol.name,
                    protocol: protocol.protocolName,
                    amount: amount,
                    vault: '',
                    category: '',
                    maxAmount: 0 
                }
            })

            setAllocationList(list.filter(item => item.amount > 0))
        }
    }, [player])
    
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