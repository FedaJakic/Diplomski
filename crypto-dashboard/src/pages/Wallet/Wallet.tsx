import React, { useState, useEffect } from 'react'
import {
  Accordion,
  Card,
  Button,
  Modal,
  Form,
  Container,
  Alert,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap'
import BitcoinCard from '../../components/wallet/BitcoinCard'
import { WalletUrlsApi } from '../../api/wallet'
import { tokenDecode } from '../../util/helpers/tokenHelpers'
import { Wallet } from '../../util/pages/wallet/types.js'
import Loading from '../../components/global/Loading'
import { useNavigate } from 'react-router-dom'

const UserWallet: React.FC = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [walletName, setWalletName] = useState<string>('')
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [walletToDelete, setWalletToDelete] = useState<Wallet | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const token = localStorage.getItem('token')

  const handleTransactions = (walletId: string) => {
    navigate(`/transactions/${walletId}`)
  }

  useEffect(() => {
    fetchUserWallets()
  }, [])

  const fetchUserWallets = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const decodedToken = tokenDecode(token)
        const userId = decodedToken.id
        const res = await WalletUrlsApi.getUserWallets({ userId })
        setWallets(res)
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setShow(false)
    setWalletName('')
  }

  const handleShow = () => setShow(true)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (token && walletName) {
        const decodedToken = tokenDecode(token)
        const userId = decodedToken.id

        await WalletUrlsApi.addWallet({
          userId,
          walletName: walletName || `wallet_${Date.now()}`,
        })
        await fetchUserWallets()
        handleClose()
      }
    } catch (err) {
      setError('Failed to create wallet')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteClose = () => setShowDeleteModal(false)

  const handleDeleteShow = (wallet: Wallet) => {
    setWalletToDelete(wallet)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      if (walletToDelete && token) {
        await WalletUrlsApi.deleteWallet({
          walletId: walletToDelete.id,
        })
        fetchUserWallets()
        setShowDeleteModal(false)
      }
    } catch (err) {
      setError('Failed to delete wallet')
    }
  }

  if (isLoading) return <Loading />
  else
    return (
      <Container className="my-4">
        <h1>Your wallets</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Accordion>
          {wallets && wallets.length === 0 ? (
            <p>No wallets found</p>
          ) : (
            wallets.map((wallet, index) => (
              <Card key={wallet.id}>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>{wallet.walletName}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={6}>
                        <BitcoinCard
                          address={wallet.address}
                          qrCode={wallet.qr}
                        />
                      </Col>
                      <Col md={6}>
                        <div className="wallet-details">
                          <p>
                            <strong>Address:</strong> {wallet.address}
                          </p>
                          <p>
                            <strong>Balance:</strong> {wallet.balance} BTC
                          </p>
                          <p>
                            <strong>Created:</strong>{' '}
                            {new Date(wallet.created).toLocaleString()}
                          </p>
                          <p>
                            <strong>Wallet Name:</strong> {wallet.walletName}
                          </p>
                          <p>
                            <strong>Default Wallet Name:</strong>{' '}
                            {wallet.defaultWalletName}
                          </p>
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteShow(wallet)}
                          style={{ marginTop: '10px' }}
                        >
                          Delete Wallet
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleTransactions(wallet.id)}
                          style={{ marginTop: '10px', marginLeft: '10px' }}
                        >
                          Transactions
                        </Button>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            ))
          )}
        </Accordion>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ marginTop: '10px' }}
        >
          Create New Wallet
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isSaving ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Creating wallet...</span>
                </Spinner>
                <p>Wallet is being creating, please wait...</p>
              </div>
            ) : (
              <Form>
                <Form.Group controlId="walletName">
                  <Form.Label>Wallet Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter wallet name"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            {!isSaving && (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this wallet?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
}

export default UserWallet
