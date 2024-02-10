import BigNumber from 'bignumber.js'
import { Hex } from 'viem'
import { useBalance } from 'wagmi'

const useDerbyTokenBalance = (address?: Hex | undefined): number => {
	const { data } = useBalance({
		address: address
		//token: process.env.NEXT_PUBLIC_TOKEN_CONTRACT as Hex
	})

	return Number(
		new BigNumber(Number(data?.value ?? 0)).div(1000000000000000000) ?? 0
	)
}

export default useDerbyTokenBalance
