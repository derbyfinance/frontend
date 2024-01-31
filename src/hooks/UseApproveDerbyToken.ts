import { UseContractWriteModel } from '@models/contract/UseContractWriteModel'
import { Abi, Hex, parseEther } from 'viem'
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
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

const useApproveDerbyToken = (amount: number): UseContractWriteModel => {
	const debouncedAmount = useDebounce<bigint>(parseEther(`${amount}`), 500)

	const {
		data,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = useSimulateContract({
		address: process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex,
		abi: abi,
		functionName: 'approve',
		args: [process.env.NEXT_PUBLIC_GAME_CONTRACT, debouncedAmount],
		query: {
			enabled: Boolean(debouncedAmount)
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

export default useApproveDerbyToken
