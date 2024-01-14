import { axiosClient } from '..';
import { API_URL } from '../../util/env';

const BlockUrls = {
  getBlockInfo: `${API_URL.api_url}/api/blocks/getBlockInfo`,
};

export const BlockUrlsApi = {
  getBlockInfo: async ({ blockHeight }: { blockHeight: string }) =>
    axiosClient
      .post(BlockUrls.getBlockInfo, { blockHeight })
      .then((res) => res.data),
};
