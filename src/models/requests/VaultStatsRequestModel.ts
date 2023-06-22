import { ChartFilterType } from "@datatypes/ChartFilterType"

export default interface VaultStatsRequestModel { 
    id: number
    filter?: ChartFilterType
}