import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const ConversionUrls = {
  getConversionInfo: `${API_URL.api_url}/api/conversion`,
}

export const ConversionUrlsApi = {
  convertCurrencies: async ({
    currencyFrom,
    currencyTo,
    value,
  }: {
    currencyFrom: string
    currencyTo: string
    value: number
  }) =>
    axiosClient
      .post(ConversionUrls.getConversionInfo, {
        currencyFrom,
        currencyTo,
        value,
      })
      .then((res) => res.data),
}
