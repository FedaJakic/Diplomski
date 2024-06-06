import Client from 'bitcoin-core'
import { baseClientConfig } from '../../config/btcServer'

export const getWalletAddressAndQrCode = async (walletName) => {
  try {
    const client = new Client(baseClientConfig)
    await client.createWallet(walletName)
    const address = await client.getNewAddress()
    return { walletName, address }
  } catch (error) {
    return { error: error.message }
  }
}
