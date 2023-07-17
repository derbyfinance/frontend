import { Hex } from 'viem'
import { useAccount, useBalance } from 'wagmi'

const useDerbyTokenBalance = (): number => {
	const { address } = useAccount()

	const { data } = useBalance({
		address: address,
		token: process.env.NEXT_PUBLIC_DERBY_TOKEN as Hex,
		watch: true
	})

	return data?.decimals ?? 0
}

export default useDerbyTokenBalance
