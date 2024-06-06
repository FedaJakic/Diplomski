import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const WalletUrls = {
  createWallet: `${API_URL.api_url}/api/wallet/create`,
  listWallets: `${API_URL.api_url}/api/wallet/list-wallet`,
  getWalletInfo: `${API_URL.api_url}/api/wallet/get-wallet-info`,
  getWalletBalance: `${API_URL.api_url}/api/wallet/get-wallet-balance`,
  getWalletAddress: `${API_URL.api_url}/api/wallet/get-wallet-address`,
  getUserWallets: `${API_URL.api_url}/api/wallet/user-wallets`,
  addWallet: `${API_URL.api_url}/api/wallet/add-wallet`,
  deleteWallet: `${API_URL.api_url}/api/wallet/delete-wallet`,
}

export const WalletUrlsApi = {
  createWallet: async ({ walletName }: { walletName: string }) =>
    axiosClient
      .post(WalletUrls.createWallet, { walletName })
      .then((res) => res.data),

  listWallets: async () =>
    axiosClient.get(WalletUrls.listWallets).then((res) => res.data),

  getWalletInfo: async ({ walletName }: { walletName: string }) =>
    axiosClient
      .post(WalletUrls.getWalletInfo, {
        walletName,
      })
      .then((res) => res.data),

  getWalletBalance: async ({ walletName }: { walletName: string }) =>
    axiosClient
      .post(WalletUrls.getWalletBalance, {
        walletName,
      })
      .then((res) => res.data),

  getWalletAddress: async ({ walletName }: { walletName: string }) =>
    axiosClient
      .post(WalletUrls.getWalletAddress, {
        walletName,
      })
      .then((res) => res.data),

  getUserWallets: async ({ userId }: { userId: string }) =>
    axiosClient
      .post(WalletUrls.getUserWallets, {
        userId,
      })
      .then((res) => res.data),

  addWallet: async ({
    userId,
    walletName,
  }: {
    userId: string
    walletName: string
  }) =>
    axiosClient
      .post(WalletUrls.addWallet, {
        userId,
        walletName,
      })
      .then((res) => res.data),

  deleteWallet: async ({ walletId }: { walletId: string }) =>
    axiosClient
      .post(WalletUrls.deleteWallet, {
        walletId,
      })
      .then((res) => res.data),
}
