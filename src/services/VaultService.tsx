import VaultListDtoModel from '@models/dto/VaultListDtoModel'
import SubgraphClient from '@network/SubgraphClient'

export const GetVaultList = async (
	amount?: number
): Promise<VaultListDtoModel> => {
	const data = {
		query: `
      query {
        vaults(first: $amount) {
          id,
          name,
          number,
          chainId,
          coin,
          category,
          baskets {
            id,
            name,
            vault,
            stakedAmount,
            redeemedRewards,
            unredeemedRewards,
            allocations
          },
          exchangeRates(first: 2) {
            id,
            exchangeRate
          }
          races {
            id,
            rebalancingPeriod,
            stakedTokens,
            totalRewards,
            apy
          }
          protocols {
              id,
              protocolName,
              protocolVault
              number,
              underlying,
              protocolLPToken,
              govToken,
          }
        }
      }`,
		variables: { amount: amount ?? 5 }
	}

	return SubgraphClient.post('', data)
}
