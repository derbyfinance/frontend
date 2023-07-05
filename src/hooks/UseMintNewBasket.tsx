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
		config,
		error: errorPrepare,
		isLoading: isLoadingPrepare,
		isSuccess: isSuccessPrepare
	} = usePrepareContractWrite({
		address: process.env.NEXT_PUBLIC_GAME_CONTRACT as Hex,
		abi: abi,
		functionName: 'mintNewBasket',
		args: [vaultNumber, name]
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

export default useMintBasket
