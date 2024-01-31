import { SimulateContractReturnType } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutate } from 'wagmi/query'

export interface UseContractWriteModel {
	data?: SimulateContractReturnType
	errorPrepare: Error | null
	isLoadingPrepare: boolean
	isSuccessPrepare: boolean
	errorTx: Error | null
	isLoadingTx: boolean
	isSuccessTx: boolean
	write: WriteContractMutate<Config, unknown>
}
