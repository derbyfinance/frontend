export interface PlayerDto {
  player: {
    id: string
    baskets: Basket[]
  }
}
export interface Basket {
  id: string
  vault: Vault
  redeemedRewards: string
  unredeemedRewards: string
  rebalancingPeriod?: string
}

export interface Vault {
  id: string
  name: string
  vaultNumber: string
  protocols: {
    id: string
    name: string
  }
}