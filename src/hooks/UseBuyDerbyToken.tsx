import { UseContractWriteModel } from '@models/contract/UseContractWriteModel'
import { useDebounce } from 'usehooks-ts'
import { Abi, Hex, parseEther } from 'viem'
import {
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction
} from 'wagmi'

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

const useBuyDerbyToken = (amount: number): UseContractWriteModel => {
	const { address } = useAccount()
	const debouncedAmount = useDebounce(parseEther(`${amount}`), 500)

	const {
		config,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = usePrepareContractWrite({
		address: process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex,
		abi: abi,
		functionName: 'mint',
		args: [address, debouncedAmount],
		enabled: Boolean(address) && Boolean(debouncedAmount)
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

export default useBuyDerbyToken
