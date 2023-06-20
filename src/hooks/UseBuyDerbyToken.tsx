import { useDebounce } from 'usehooks-ts'
import { parseEther } from 'viem'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

const abi = [
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

const useBuyDerbyToken = (amount: number) => {
	const { address } = useAccount()
	const debouncedAmount = useDebounce(parseEther(`${amount}`), 500)

	const { config } = usePrepareContractWrite({
		address: process.env.NEXT_PUBLIC_DERBY_TOKEN as `0x${string}`,
		abi: abi,
		functionName: 'mint',
		args: [address, debouncedAmount],
		enabled: Boolean(debouncedAmount)
	})
	const {
		data,
		isLoading,
		isSuccess,
		write: buyTokens
	} = useContractWrite(config)

	return { data, isLoading, isSuccess, buyTokens }
}

export default useBuyDerbyToken
