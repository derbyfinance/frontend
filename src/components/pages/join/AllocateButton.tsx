import Notification from '@components/Notification'
import ActionButton from '@components/buttons/ActionButton'
import { Small } from '@components/fonts/Title'
import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { useAppDispatch, useAppSelector } from '@hooks/ReduxStore'
import useApproveDerbyToken from '@hooks/UseApproveDerbyToken'
import useRebalanceBasket from '@hooks/UseRebalanceBasket'
import RebalanceModel from '@models/internal/RebalanceModel'
import AllocationRequestModel from '@models/requests/AllocationRequestModel'
import { clearAllocationListState, getAllocationListState } from '@store/RaceSlice'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AllocateButton = () => {
	const dispatch = useAppDispatch()
	const allocationList = useAppSelector<AllocationRequestModel[] | undefined>(
		getAllocationListState
	)

	const [amount, setAmount] = useState<number>(0)
	const [rebalance, setRebalance] = useState<RebalanceModel>({ basketId: 0, delta: [] })

	const { isSuccessPrepare, errorPrepare, isSuccessTx, errorTx, write } = useApproveDerbyToken(amount)
	
	const rebalanceBasket = useRebalanceBasket(rebalance)
	
	useEffect(() => {
		if (errorPrepare || errorTx || rebalanceBasket.errorPrepare ||  rebalanceBasket.errorTx) {
			toast.error(
				<Notification
					title="Allocate tokens"
					notification="Something went wrong during the allocation. Please try again."
				/>
			)
		}
	}, [errorTx, errorPrepare, rebalanceBasket.errorPrepare, rebalanceBasket.errorTx])

	useEffect(() => {
		if (isSuccessPrepare && isSuccessTx) {			
			const id = Number(allocationList![0].nft)
			//TODO: what needs to be in the delta
			const delta: number[] = []
			setRebalance({basketId: id, delta: delta})
		}
	}, [isSuccessPrepare, isSuccessTx])

	useEffect(() => {
		if (rebalanceBasket.isSuccessPrepare) {
			rebalanceBasket.write?.()
		}
	}, [rebalanceBasket.isSuccessPrepare])
		
	useEffect(() => { 
		if (isSuccessPrepare && isSuccessTx) {
			toast.success(
				<Notification
					title="Allocate tokens"
					notification="The allocation has been succesful."
				/>
			)

			dispatch(clearAllocationListState())
		}
	}, [rebalanceBasket.isSuccessPrepare, rebalanceBasket.isSuccessTx])

	const handleAllocate = useCallback((): void => { 

		allocationList?.forEach(({ amount }) => {
			setAmount(amount)
		})
	}, [])

	useEffect(() => {
		if (isSuccessPrepare) {
			write?.()
		}
	}, [isSuccessPrepare])

	return (
		<ActionButton
			$isCta
			$align="right"
			onClick={handleAllocate}
			disabled={!allocationList || allocationList?.length <= 0}>
			{`Buy now  `}
			{ToCoinCurrency(
				allocationList?.reduce((prev, allocate) => {
					return prev + allocate?.amount
				}, 0) ?? 0,
				0
			)}
			{` `}
			<Small>DRB</Small>
		</ActionButton>
	)
}

export default AllocateButton
