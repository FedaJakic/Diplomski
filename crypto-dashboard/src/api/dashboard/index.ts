import { axiosClient } from '..';
import { API_URL } from '../../util/env';

const DashboardUrls = {
  getBlockchainHeight: `${API_URL.api_url}/api/dashboard/blockchain-height`,
};

export const DashboardUrlsApi = {
  getBlockchainHeight: async () =>
    axiosClient.get(DashboardUrls.getBlockchainHeight).then((res) => res.data),
};
