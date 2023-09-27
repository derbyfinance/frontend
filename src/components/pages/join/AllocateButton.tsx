import Notification from '@components/Notification'
import ActionButton from '@components/buttons/ActionButton'
import { Small } from '@components/fonts/Title'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import useApproveDerbyToken from '@hooks/UseApproveDerbyToken'
import useDidMountEffect from '@hooks/UseDidMountEffect'
import useRebalanceBasket from '@hooks/UseRebalanceBasket'
import { PlayerDtoModel } from '@models/dto/PlayerDtoModel'
import RebalanceModel from '@models/internal/RebalanceModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { clearAllocationListState, getAllocationListState } from '@store/RaceSlice'
import { getPlayerState } from '@store/UserSlice'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

const AllocateButton = () => {
	const dispatch = useAppDispatch()
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)
	
	const player = useAppSelector<PlayerDtoModel | undefined>(getPlayerState)
	const [amount, setAmount] = useState<number>(0)
	const [rebalance, setRebalance] = useState<RebalanceModel>({ basketId: '', delta: [] })

	const approveToken = useApproveDerbyToken(amount)
	
	const rebalanceBasket = useRebalanceBasket(rebalance)
	
	useDidMountEffect(() => {
		if (!approveToken.isSuccessPrepare || amount === 0) return
		console.log('approveToken', 'write')
		approveToken.write?.()
	}, [approveToken.isSuccessPrepare, amount])
	
	useDidMountEffect(() => {
		if (approveToken.errorPrepare || approveToken.errorTx) {
			errorRebalance()
		}
	}, [approveToken.errorTx, approveToken.errorPrepare])

	useDidMountEffect(() => {
		if (!approveToken.isSuccessPrepare || !approveToken.isSuccessTx) return
		startRebalance()	
	}, [approveToken.isSuccessPrepare, approveToken.isSuccessTx])





	useDidMountEffect(() => {
		if (!rebalanceBasket.isSuccessPrepare) return
		rebalanceBasket.write?.()
	}, [rebalanceBasket.isSuccessPrepare])
		
	useDidMountEffect(() => { 
		if (!rebalanceBasket.isSuccessPrepare || !rebalanceBasket.isSuccessTx) return
		successRebalance()
	}, [rebalanceBasket.isSuccessPrepare, rebalanceBasket.isSuccessTx])

	useDidMountEffect(() => {
		if (rebalanceBasket.errorPrepare) {
			setAmount(getTotal())
		}
	}, [rebalanceBasket.errorPrepare])

	useDidMountEffect(() => {
		if (rebalanceBasket.errorPrepare && rebalanceBasket.errorTx) {
			errorRebalance()
		}
	}, [rebalanceBasket.errorPrepare, rebalanceBasket.errorTx])

	const startRebalance = useCallback((): void => { 
		const nft = allocationList![0].nft
			
		const list = player?.player.baskets.find(({ id }) => id === allocationList![0].nft)
			?.vault.protocols ?? []
		
		const delta: number[] = list.map(({ id }) => {
			const item = allocationList?.find(({protocol}) => protocol === id)
			return item ? item.amount: 0
		})
		setRebalance({basketId: nft, delta: delta})
	}, [allocationList, player])

	const errorRebalance = useCallback((): void => { 
		toast.error(
			<Notification
				title="Allocate tokens"
				notification="Something went wrong during the allocation. Please try again."
			/>
		)
	}, [])

	const successRebalance = useCallback((): void => { 
		toast.success(
			<Notification
				title="Allocate tokens"
				notification="The allocation has been succesful."
			/>
		)

		dispatch(clearAllocationListState())
	}, [])

	const handleAllocate = useCallback((): void => { 
		startRebalance()

	}, [allocationList])

	const getTotal = useCallback((): number => { 
		return allocationList?.reduce((prev, allocate) => {
					return prev + allocate?.amount
				}, 0) ?? 0
	}, [allocationList])

	return (
		<>
			{approveToken.isLoadingPrepare.toString()} {approveToken.isLoadingTx.toString()} {rebalanceBasket.isLoadingPrepare.toString()} {rebalanceBasket.isLoadingTx.toString()}
		<ActionButton
			$isCta
			$align="right"
			$isLoading={approveToken.isLoadingPrepare || approveToken.isLoadingTx || rebalanceBasket.isLoadingPrepare || rebalanceBasket.isLoadingTx}
			onClick={handleAllocate}
			disabled={!allocationList || allocationList?.length <= 0}>
			{`Buy now  `}
			{ToCoinCurrency(getTotal(), 0)}
			{` `}
			<Small>DRB</Small>
			</ActionButton>
			</>
	)
}

export default AllocateButton
