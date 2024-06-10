import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const GraphsAndInfos = {
  getAllTableData: `${API_URL.api_url}/api/crypto-info/all`,
  getCodeData: `${API_URL.api_url}/api/crypto-info/`,
  getSingleHistory: `${API_URL.api_url}/api/crypto-info/single-history`,
  getMempoolData: `${API_URL.api_url}/api/bitcoin/mempool`,
  setVisibility: `${API_URL.api_url}/api/crypto-info/visibility`,
}

export const GraphsAndInfosApi = {
  getTableInfo: async ({
    page = 1,
    limit = 10,
    sortField = 'rank',
    sortOrder = 'asc',
  }) =>
    axiosClient
      .post(GraphsAndInfos.getAllTableData, {
        page,
        limit,
        sortField,
        sortOrder,
      })
      .then((res) => res.data),

  getMempoolInfo: async () =>
    axiosClient.get(GraphsAndInfos.getMempoolData).then((res) => res),

  getCodeInfo: async ({ currency, code }: { currency: string; code: string }) =>
    axiosClient
      .post(GraphsAndInfos.getCodeData, { currency, code })
      .then((res) => res.data),

  getSingleHistory: async ({
    currency,
    code,
  }: {
    currency: string
    code: string
  }) =>
    axiosClient
      .post(GraphsAndInfos.getSingleHistory, { currency, code })
      .then((res) => res.data),

  updateCryptoVisibility: async ({
    id,
    visibility,
  }: {
    id: string
    visibility: boolean
  }) =>
    axiosClient
      .post(GraphsAndInfos.setVisibility, { id, visibility })
      .then((res) => res.data),
}
