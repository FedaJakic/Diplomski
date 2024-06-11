import bitcoin from 'bitcoinjs-lib'
import qr from 'qr-image'
import Client from 'bitcoin-core'
import Wallet from '../models/Wallet.js'

const baseClientConfig = {
  host: 'blockchain.oss.unist.hr',
  port: 8332,
  username: 'student',
  password: 'n23PTn9YHfRDE6KPNJTakd4cfmNVj62jd8kr2REi2i8Tn',
}

export const createNewWallet = async (req, res) => {
  try {
    const walletName = `wallet_${Date.now()}`
    const client = new Client(baseClientConfig)
    await client.createWallet(walletName)
    res.status(201).send('Wallet created!')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const listWallets = async (req, res) => {
  try {
    const client = new Client(baseClientConfig)
    const wallets = await client.listWallets()
    res.status(200).send(wallets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getWalletInfo = async (req, res) => {
  const { walletName } = req.body
  try {
    const client = new Client({ ...baseClientConfig, wallet: walletName })
    const walletInfo = await client.getWalletInfo()
    res.json(walletInfo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getWalletBalance = async (req, res) => {
  const { walletName } = req.body
  try {
    const client = new Client({ ...baseClientConfig, wallet: walletName })
    const balance = await client.getBalance()
    res.json({ balance })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getWalletAddress = async (req, res) => {
  const { walletName } = req.body
  try {
    const client = new Client({ ...baseClientConfig, wallet: walletName })
    const address = await client.getNewAddress()

    const qrCodeStream = qr.image(address, { type: 'png' })
    const chunks = []

    qrCodeStream.on('data', (chunk) => chunks.push(chunk))
    qrCodeStream.on('end', () => {
      const qrCodeBuffer = Buffer.concat(chunks)
      const qrCodeBase64 = qrCodeBuffer.toString('base64')
      res.json({ address, qrCode: qrCodeBase64 })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete wallet
export const deleteWallet = async (req, res) => {
  const { walletId } = req.body
  try {
    const wallet = await Wallet.findOne({ where: { id: walletId } })

    if (!wallet) {
      return res.status(404).send({ error: 'Wallet not found' })
    }

    const { defaultWalletName } = wallet

    await Wallet.destroy({ where: { id: walletId } })

    const client = new Client(baseClientConfig)
    await client.unloadWallet(defaultWalletName)

    res.status(200).send({
      success: true,
      message: `Wallet ${defaultWalletName} deleted successfully`,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const addWallet = async (req, res) => {
  const { walletName, userId } = req.body
  try {
    const defaultWalletName = `wallet_${Date.now()}`
    const walletClient = new Client(baseClientConfig)
    await walletClient.createWallet(defaultWalletName)

    const client = new Client({
      ...baseClientConfig,
      wallet: defaultWalletName,
    })
    const address = await client.getNewAddress()

    const qrCodeStream = qr.image(address, { type: 'png' })
    const chunks = []

    qrCodeStream.on('data', (chunk) => chunks.push(chunk))
    qrCodeStream.on('end', async () => {
      try {
        const qrCodeBuffer = Buffer.concat(chunks)
        const qrCodeBase64 = qrCodeBuffer.toString('base64')

        const newWallet = await Wallet.create({
          userId,
          walletName,
          defaultWalletName,
          address,
          qr: qrCodeBase64,
          balance: 0.0,
        })

        res.status(200).send(newWallet)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    })

    qrCodeStream.on('error', (error) => {
      res.status(500).json({ error: error.message })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUserWallets = async (req, res) => {
  const { userId } = req.body
  try {
    const wallets = await Wallet.findAll({ where: { userId } })

    if (!wallets || wallets.length === 0) {
      return res.status(404).send({ error: 'No wallets found for this user' })
    }

    const updatedWallets = await Promise.all(
      wallets.map(async (wallet) => {
        const client = new Client({
          ...baseClientConfig,
          wallet: wallet.defaultWalletName,
        })
        const balance = await client.getBalance()

        wallet.balance = balance
        await wallet.save()

        return wallet
      })
    )

    res.status(200).send(updatedWallets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const sendBTC = async (req, res) => {
  const { walletName, toAddress, amount } = req.body
  try {
    const client = new Client({ ...baseClientConfig, wallet: walletName })

    const balance = await client.getBalance()
    const amountToSend = parseFloat(amount)

    const feeEstimate = await client.estimateSmartFee(6)
    const feeRate = feeEstimate.feerate || 0.00001

    const transactionSize = 250
    const fee = transactionSize * feeRate

    const maxAmountToSend = balance - fee
    if (maxAmountToSend <= 0) {
      return res
        .status(400)
        .json({ error: 'Insufficient funds to cover even the transaction fee' })
    }

    if (amountToSend > maxAmountToSend) {
      return res.status(400).json({
        error: `Insufficient funds. Maximum amount that can be sent is ${maxAmountToSend.toFixed(
          8
        )} BTC`,
      })
    }

    const txid = await client.sendToAddress(toAddress, amountToSend)
    res.status(200).json({ txid })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getTransactions = async (req, res) => {
  const { walletName } = req.body
  try {
    const client = new Client({ ...baseClientConfig, wallet: walletName })
    const transactions = await client.listTransactions()
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getWallet = async (req, res) => {
  const { walletId } = req.body
  try {
    const wallet = await Wallet.findOne({ where: { id: walletId } })
    res.status(200).send(wallet)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
