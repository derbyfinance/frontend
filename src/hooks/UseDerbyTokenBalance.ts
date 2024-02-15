import BigNumber from 'bignumber.js'
import { Hex } from 'viem'
import { useBalance } from 'wagmi'

const useDerbyTokenBalance = (
	address?: Hex | undefined
): { rewards: number; refetch: VoidFunction } => {
	const { data, refetch } = useBalance({
		address: address
		// token: process.env.NEXT_PUBLIC_TOKEN_CONTRACT as Hex
	})

	return {
		rewards: Number(
			new BigNumber(Number(data?.value ?? 0)).div(1000000000000000000) ?? 0
		),
		refetch: refetch
	}
}

export default useDerbyTokenBalance
