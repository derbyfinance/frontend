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
			{ internalType: 'address', name: 'account', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'mint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

const useBuyDerbyToken = (
	amount: number,
	address: Hex | undefined
): UseContractWriteModel => {
	const debouncedAmount = useDebounce<bigint>(parseEther(`${amount}`), 500)

	const {
		data,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = useSimulateContract({
		address: process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex,
		abi: abi,
		functionName: 'mint',
		args: [address, debouncedAmount],
		query: {
			enabled: Boolean(address) && Boolean(debouncedAmount)
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

export default useBuyDerbyToken
