import { CoinType } from "@datatypes/CoinType";
import { CurrencyType } from "@datatypes/CurrencyType";

export default interface LocalizeModel { 
    currency: CoinType | CurrencyType | '%'
    decimals: number
    abbr: boolean
}   