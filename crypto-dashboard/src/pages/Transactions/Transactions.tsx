import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Button, Alert, Table } from 'react-bootstrap'
import { WalletUrlsApi } from '../../api/wallet'
import Loading from '../../components/global/Loading'
import { Wallet } from '../../util/pages/wallet/types'
import { Transaction } from '../../util/pages/Transactions/types'

const Transactions: React.FC = () => {
  const { walletId } = useParams<{ walletId: string }>()
  const [walletName, setWalletName] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      if (walletId) {
        const res = await WalletUrlsApi.getWallet({ walletId })
        const defaultWalletName = res.defaultWalletName
        setWalletName(defaultWalletName)

        if (defaultWalletName) {
          const res = await WalletUrlsApi.getTransactions({
            walletName: defaultWalletName,
          })
          setTransactions(res)

          const resBalance = await WalletUrlsApi.getWalletBalance({
            walletName: defaultWalletName,
          })
          setBalance(resBalance.balance)
        }
      }

      setIsLoading(false)
    } catch (error) {}
  }

  const handleSendBTC = async () => {
    try {
      if (walletName) {
        await WalletUrlsApi.sendBTC({ walletName, toAddress, amount })
        fetchData()
      }
    } catch (err) {
      setError('Failed to send BTC')
    }
  }

  if (isLoading) return <Loading />
  else
    return (
      <Container className="my-4">
        <h1>Transactions for {walletName}</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="mb-4">
          <h2>Send Bitcoin</h2>
          <Form>
            <Form.Group controlId="toAddress">
              <Form.Label>To Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="amount" className="mt-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleSendBTC}>
              Send BTC
            </Button>
          </Form>
        </div>
        <div className="mb-4">
          <h2>Wallet Balance</h2>
          <p>{balance} BTC</p>
        </div>
        <div>
          <h2>Transaction History</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>TxID</th>
                <th>Amount</th>
                <th>Confirmations</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions ? (
                transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.txid}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.confirmations}</td>
                    <td>{new Date(tx.time * 1000).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <td>no transactions</td>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    )
}

export default Transactions
