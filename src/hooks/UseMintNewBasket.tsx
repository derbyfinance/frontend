import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction
} from 'wagmi'

const abi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_vaultNumber',
				type: 'uint256'
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

const useMintBasket = (vaultNumber: number) => {
	const {
		config,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = usePrepareContractWrite({
		address: process.env.NEXT_PUBLIC_GAME_CONTRACT as `0x${string}`,
		abi: abi,
		functionName: 'mintNewBasket',
		args: [vaultNumber]
	})
	const { data, write: writeMintNewBasket } = useContractWrite(config)

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
		writeMintNewBasket
	}
}

export default useMintBasket
