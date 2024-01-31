import { UseContractWriteModel } from '@models/contract/UseContractWriteModel'
import { Abi, Hex } from 'viem'
import {
	useSimulateContract,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi'

const abi: Abi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_vaultNumber',
				type: 'uint256'
			},
			{
				internalType: 'string',
				name: '_name',
				type: 'string'
			}
		],
		name: 'mintNewBasket',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

const useMintBasket = (
	vaultNumber: number,
	name: string
): UseContractWriteModel => {
	const {
		data,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = useSimulateContract({
		address: process.env.NEXT_PUBLIC_GAME_CONTRACT as Hex,
		abi: abi,
		functionName: 'mintNewBasket',
		args: [vaultNumber, name],
		query: {
			enabled: vaultNumber > 0
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

export default useMintBasket
