import DoughnutChart from '@components/charts/DoughnutChart'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import ChartDataModel from '@models/internal/ChartDataModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { getPlayerState, getPlayerData } from '@store/UserSlice'
import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'

const AllocationChart = () => {
    const dispatch = useAppDispatch()
    const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
    const [allocationList, setAllocationList] = useState<ChartDataModel[]>([])
    
    const {address} = useAccount()

    useEffect(() => {
		if (address !== undefined)
			dispatch(getPlayerData(address))
    }, [address])
    
    useEffect(() => { 
        if (player && player?.player?.baskets.length > 0) { 
            const allocations: string[] = player.player.baskets[0].allocations
    
            const list:ChartDataModel[] = player.player.baskets[0].vault.protocols.map((protocol) => {

                const amount = Number(allocations[Number(protocol.number)])
                return {
                    label: protocol.name,
                    data: amount
                }
            })

            setAllocationList(list.filter(item => item.data > 0))
        }
    }, [player])
    
    return (
        <Chart>
            <DoughnutChart data={allocationList} />
        </Chart>
   )
}

const Chart = styled.div`
	flex: 0 1 auto;
	max-width: 12em;
`
export default AllocationChart