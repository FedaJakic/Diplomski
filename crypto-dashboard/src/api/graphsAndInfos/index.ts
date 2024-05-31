import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const GraphsAndInfos = {
  getAllTableData: `${API_URL.api_url}/api/crypto-info/all`,
}

export const GraphsAndInfosApi = {
  getTableInfo: async () =>
    axiosClient.post(GraphsAndInfos.getAllTableData).then((res) => res.data),
}
