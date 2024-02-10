import { UseContractWriteModel } from '@models/contract/UseContractWriteModel'
import RebalanceModel from '@models/internal/RebalanceModel'
import { Abi, Hex } from 'viem'
import {
	useSimulateContract,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi'
import useDebounce from './UseDebounce'

const abi: Abi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_basketId',
				type: 'uint256'
			},
			{
				internalType: 'int256[]',
				name: '_deltaAllocations',
				type: 'int256[]'
			}
		],
		name: 'rebalanceBasket',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

// The deltaAllocation[] should have the same length as the number of protocols in a vault.
// For now this is 3.
// If a user does not set allocations for a protocol, the delta should be 0.

// Requirement: The user must have approved the DerbyToken contract.
// With the spender as the Game contract
// and the amount as the sum of the deltaAllocations.
const useRebalanceBasket = (
	rebalance: RebalanceModel
): UseContractWriteModel => {
	const debounceDelta = useDebounce<RebalanceModel>(rebalance, 500)

	const {
		data,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = useSimulateContract({
		address: process.env.NEXT_PUBLIC_GAME_CONTRACT as Hex,
		abi: abi,
		functionName: 'rebalanceBasket',
		args: [debounceDelta.basketId, debounceDelta.delta],
		query: {
			enabled: Boolean(debounceDelta.delta.length > 0)
		}
	})

	const { data: dataWrite, writeContract: write } = useWriteContract()

	const {
		error: errorTx,
		isLoading: isLoadingTx,
		isSuccess: isSuccessTx
	} = useWaitForTransactionReceipt({
		hash: dataWrite
	})

	return {
		data,
		errorPrepare,
		isLoadingPrepare,
		isSuccessPrepare,
		errorTx,
		isLoadingTx,
		isSuccessTx,
		write
	}
}

export default useRebalanceBasket