export interface PlayerDtoModel {
	player: {
		id: string
		baskets: BasketDtoModel[]
	}
}

export interface BasketDtoModel {
	id: string
	name: string
	vault: VaultDtoModel
	stakedAmount: string
	redeemedRewards: string
	unredeemedRewards: string
	rebalancingPeriod?: string
	allocations?: string[]
}

export interface AllocationDtoModel {
	id: string
}

export interface ProtocolDtoModel {
	id: string
	name: string
	network: string
	coin: string
	protocol: string
	protocolName: string
	number: string
}

export interface RewardsDtoModel {
	rewards: string[]
}

export interface RaceDtoModel {
	stakedTokens: number
	totalRewards: number
	id: number
	rebalancingPeriod: string
	apy: number
}

export interface ExchangeRateDtoModel {
	id: string
	exchangeRate: number
}
export interface VaultDtoModel {
	id: string
	name: string
	network: string
	protocol: string
	coin: string
	category: string
	vaultNumber: string
	protocols: ProtocolDtoModel[]
	vaultRewards: RewardsDtoModel
	races: RaceDtoModel[]
	baskets: BasketDtoModel[]
	exchangeRates: ExchangeRateDtoModel[]
}
