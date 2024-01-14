import { axiosClient } from '..';
import { API_URL } from '../../util/env';

const BlockUrls = {
  getLastBlocks: `${API_URL.api_url}/api/blocks/getLastSixBlockchainInfo`,
  getBlockInfo: `${API_URL.api_url}/api/blocks/getBlockInfo`,
  getBlockHeightByHash: `${API_URL.api_url}/api/blocks/getBlockHeightByHash`,
};

export const BlockUrlsApi = {
  getLastBlocks: async () =>
    axiosClient.get(BlockUrls.getLastBlocks).then((res) => res.data),

  getBlockInfo: async ({ blockHeight }: { blockHeight: string }) =>
    axiosClient
      .post(BlockUrls.getBlockInfo, { blockHeight })
      .then((res) => res.data),

  getBlockHeightByHash: async ({ hash }: { hash: string }) =>
    axiosClient
      .post(BlockUrls.getBlockHeightByHash, { hash })
      .then((res) => res.data),
};
