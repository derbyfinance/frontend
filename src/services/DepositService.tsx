import SubgraphClient from '@network/SubgraphClient'

import { DepositDtoModel } from '@models/dto/DepositDtoModel'
import { Hex } from 'viem'

const unixTime = Math.floor(new Date().getTime() / 1000)

export const CalculatePoints = async (
	address: Hex
): Promise<DepositDtoModel> => {
	const data = {
				query: `query ($address: ID!) {
						deposits(where: {user: $address}) {
							amount
							blockTimestamp
							preferredProtocol
							referral
							user
						}
						}`,variables: { address: address.toString() }
	}
	const returnData = await SubgraphClient.post('', data)

	console.log('---return data', returnData)

	// Aggregate the amounts
	let totalAmount = BigInt(0) 

	returnData.data.deposits.forEach((deposit: Record<string, any>) => {
		totalAmount += BigInt(deposit.amount)
			* (BigInt(unixTime) - BigInt(deposit.blockTimestamp))
			/ BigInt(3600)
			/ BigInt(10 ** 16);
	});

	console.log('---totalAmount', totalAmount)

	const aggregatedDeposit: DepositDtoModel = {
		user: address,
		points: totalAmount
	}

	return aggregatedDeposit
}
