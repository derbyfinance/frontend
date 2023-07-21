import { UseContractWriteModel } from '@models/contract/UseContractWriteModel'
import { Abi, Hex } from 'viem'
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction
} from 'wagmi'

const abi: Abi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_basketId',
				type: 'uint256'
			},
			{
				internalType: 'int256[][]',
				name: '_deltaAllocations',
				type: 'int256[][]'
			}
		],
		name: 'rebalanceBasket',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

const useRebalanceBasket = (
	basketId: number,
	deltaAllocations: number[][]
): UseContractWriteModel => {
	const {
		config,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = usePrepareContractWrite({
		address: process.env.NEXT_PUBLIC_GAME_CONTRACT as Hex,
		abi: abi,
		functionName: 'rebalanceBasket',
		args: [basketId.toString(), deltaAllocations],
		enabled: Boolean(deltaAllocations)
	})

	const { data, write } = useContractWrite(config)

	const {
		error: errorTx,
		isLoading: isLoadingTx,
		isSuccess: isSuccessTx
	} = useWaitForTransaction({
		hash: data?.hash
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
