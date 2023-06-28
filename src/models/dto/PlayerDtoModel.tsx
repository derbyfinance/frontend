export interface PlayerDto {
	player: {
		id: string
		baskets: Basket[]
	}
}
export interface Basket {
	id: string
	vault: VaultDto
	redeemedRewards: string
	unredeemedRewards: string
	rebalancingPeriod?: string
}

export interface VaultDto {
	id: string
	name: string
	vaultNumber: string
	protocols: {
		id: string
		name: string
		network: string
		coin: string
		protocol: string
		protocolNumber: string
	}
}
