import bitcoin from 'bitcoin-core'

const createBitcoinClient = (walletName = '') => {
  const walletPath = walletName ? `/wallet/${walletName}` : ''
  return new bitcoin({
    host: process.env.BTC_NODE_HOST,
    port: process.env.BTC_NODE_PORT,
    username: process.env.BTC_NODE_USER,
    password: process.env.BTC_NODE_PASS,
    wallet: walletPath,
  })
}

export default createBitcoinClient
