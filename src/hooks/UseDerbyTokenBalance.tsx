import { Hex } from 'viem'
import { useAccount, useBalance } from 'wagmi'

const useDerbyTokenBalance = (): string => {
	const { address } = useAccount()
	const { data } = useBalance({
		address: address,
		token: process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex,
		watch: true
	})

	return data?.formatted ?? '0'
}

export default useDerbyTokenBalance
