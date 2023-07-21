import { UseContractWriteModel } from '@models/contract/UseContractWriteModel'
import { useDebounce } from 'usehooks-ts'
import { Abi, Hex, parseEther } from 'viem'
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction
} from 'wagmi'

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
		config,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = usePrepareContractWrite({
		address: process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex,
		abi: abi,
		functionName: 'approve',
		args: [process.env.NEXT_PUBLIC_GAME_CONTRACT, debouncedAmount],
		enabled: Boolean(debouncedAmount)
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

export default useApproveDerbyToken
