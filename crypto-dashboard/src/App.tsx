import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Route, Routes } from 'react-router-dom'
import MainDashboard from './pages/Blockchain/MainDashboard'
import BlockInformation from './pages/BlockInformation'
import Footer from './components/global/Footer'
import Transaction from './pages/Transaction'
import Header from './components/global/Header'
import Sidebar from './components/global/Sidebar'
import Login from './pages/LoginAndRegistration/Login'
import Register from './pages/LoginAndRegistration/Register'
import { PagesURLs } from './util/env'
import Conversion from './pages/Conversion/Conversion'
import Bitcoin from './pages/Bitcoin/Bitcoin'
import NewsAndAnalysis from './pages/News/News'
import AccountDetails from './pages/AccountDetails/AccountDetails'
import ListUser from './pages/ListUser/ListUser'
import CryptoSearchAndGraphs from './pages/CryptoSearchAndGraphs/CryptoSearchAndGraphs'
import CoinDetails from './pages/Coin/CoinDetails'
import SendMessage from './pages/SendMessage/SendMessage'
import MessageList from './pages/MessageList/MessageList'
import MessageDetail from './pages/MessageDetail/MessageDetail'
import UserWallet from './pages/Wallet/Wallet'
import Transactions from './pages/Transactions/Transactions'
import ListCrypto from './pages/ListCrypto/ListCrypto'

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            height: 'calc(100vh - 131px)',
            backgroundColor: '#f8f9fa',
            overflowY: 'auto',
          }}
        >
          <Routes>
            <Route path={PagesURLs.Login} element={<Login />} />
            <Route path={PagesURLs.Register} element={<Register />} />
            <Route
              path={PagesURLs.BlockHeight}
              element={<BlockInformation />}
            />
            <Route
              path={PagesURLs.BitcoinBlockchain}
              element={<MainDashboard />}
            />
            <Route
              path={PagesURLs.CryptoSearch}
              element={<CryptoSearchAndGraphs />}
            />
            <Route
              path={`${PagesURLs.CryptoSearch}/:code`}
              element={<CoinDetails />}
            />
            <Route
              path={PagesURLs.NewsAndAnalysis}
              element={<NewsAndAnalysis />}
            />
            <Route path={PagesURLs.Conversion} element={<Conversion />} />
            <Route path={PagesURLs.Bitcoin} element={<Bitcoin />} />
            <Route
              path="/transaction/:transactionId"
              element={<Transaction />}
            />
            <Route
              path="/account-details/:userId"
              element={<AccountDetails />}
            />
            <Route path={PagesURLs.ListUser} element={<ListUser />} />
            <Route path="/send-message/:userId" element={<SendMessage />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/messages/:messageId" element={<MessageDetail />} />
            <Route path="/wallet" element={<UserWallet />} />
            <Route path="/transactions/:walletId" element={<Transactions />} />
            <Route path={PagesURLs.CryptoVisibility} element={<ListCrypto />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
