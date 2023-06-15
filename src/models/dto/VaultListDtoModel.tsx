import { VaultDtoModel } from './VaultDtoModel'

export default interface VaultListDtoModel {
  count: number
  results: VaultDtoModel[]
}
