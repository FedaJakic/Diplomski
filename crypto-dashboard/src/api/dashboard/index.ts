import { axiosClient } from '..';
import { API_URL } from '../../util/env';

const DashboardUrls = {
  getBlockchainHeight: `${API_URL.api_url}/api/dashboard/blockchain-height`,
  getLastBlocks: `${API_URL.api_url}/api/blocks/getLastSixBlockchainInfo`,
};

export const DashboardUrlsApi = {
  getBlockchainHeight: async () =>
    axiosClient.get(DashboardUrls.getBlockchainHeight).then((res) => res.data),

  getLastBlocks: async () =>
    axiosClient.get(DashboardUrls.getLastBlocks).then((res) => res.data),
};
