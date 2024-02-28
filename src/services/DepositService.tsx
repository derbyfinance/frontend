import SubgraphClient from '@network/SubgraphClient'

import { DepositDtoModel } from '@models/dto/DepositDtoModel'
import { Hex } from 'viem'

const unixTime = Math.floor(new Date().getTime() / 1000)

export const CalculatePoints = async (
	address: Hex
): Promise<DepositDtoModel> => {
	const data = {
		query: `{deposits(where: {user: $address}) {
                        id
                        user
                        amount
                        preferredProtocol
                        blockTimestamp
                        referral
                    }
                }`,
		variables: { address: address.toString() }
	}
	const returnData = await SubgraphClient.post('', data)

	console.log('---return data', returnData)

	// Aggregate the amounts
	let totalAmount = BigInt(0) // Use the BigInt function

	if (returnData.data && returnData.data.deposits) {
		totalAmount = returnData.data.deposits.reduce(
			(total: bigint, deposit: any) => {
				// Ensure that deposit.amount is a string
				if (typeof deposit.amount === 'string') {
					return (
						BigInt(total.toString()) +
						(BigInt(deposit.amount) *
							(BigInt(unixTime) - BigInt(deposit.blockTimestamp))) /
							BigInt(3600) /
							BigInt(10 ** 16)
					)
				} else {
					throw new Error('deposit.amount must be a string')
				}
			},
			BigInt(0)
		) // Use the BigInt function
	}

	// Create a new DepositDtoModel object with the aggregated amount
	const aggregatedDeposit: DepositDtoModel = {
		user: address,
		points: totalAmount
	}

	// final return
	return aggregatedDeposit
}
