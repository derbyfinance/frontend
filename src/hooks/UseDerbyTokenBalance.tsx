import { useAccount, useBalance } from 'wagmi'

const useDerbyTokenBalance = () => {
	const { address } = useAccount()
	const { data } = useBalance({
		address: address,
		token: process.env.NEXT_PUBLIC_DERBY_TOKEN as `0x${string}`,
		watch: true
	})

	return data?.formatted ?? '0'
}

export default useDerbyTokenBalance
