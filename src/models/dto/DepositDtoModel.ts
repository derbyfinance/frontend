import { Hex } from 'viem'

export interface DepositDtoModel {
	amount: bigint
	blockTimestamp: number
	preferredProtocol: number
	referral: Hex
	user: Hex
}
