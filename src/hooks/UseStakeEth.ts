import { tokenAbi } from '@/abis/tokenAbi'
import { Hex } from 'viem'
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract
} from 'wagmi'

const useStakeEth = (address: Hex | undefined) => {
	// Get token balance in vault
	// should use refetch when TX is complete
	const { data: tokenBalance, refetch } = useReadContract({
		abi: tokenAbi,
		address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT as Hex,
		functionName: 'balanceOf',
		args: [address],
		query: {
			enabled: Boolean(address !== undefined)
		}
	})

	const { data: hash, error, isPending, writeContract } = useWriteContract()

	// Waiting for result
	const { isLoading, isSuccess } = useWaitForTransactionReceipt({
		hash
	})

	return {
		tokenBalance,
		refetch,
		isLoading,
		isSuccess,
		error,
		isPending,
		writeContract
	}
}

export default useStakeEth
