import { Hex } from 'viem'

export type UseContractWriteModel = {
	data?: { hash: Hex }
	errorPrepare: Error | null
	isLoadingPrepare: boolean
	isSuccessPrepare: boolean
	errorTx: Error | null
	isLoadingTx: boolean
	isSuccessTx: boolean
	write: (() => void) | undefined
}
