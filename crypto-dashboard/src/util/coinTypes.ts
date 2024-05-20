import { Cryptocurrencies, Currencies } from './env'

export interface CoinConversion {
  name: string
  shortName: string
}

const enumToCoinConversion = (enumObj: any): CoinConversion[] => {
  return Object.keys(enumObj).map((key) => ({
    name: key,
    shortName: enumObj[key as keyof typeof enumObj],
  }))
}

let CurrenciesList: CoinConversion[] = []

if (CurrenciesList.length === 0) {
  CurrenciesList = [
    ...enumToCoinConversion(Currencies),
    ...enumToCoinConversion(Cryptocurrencies),
  ]
}

export { CurrenciesList }
