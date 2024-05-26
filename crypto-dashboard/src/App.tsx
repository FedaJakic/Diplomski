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
import CryptoSearch from './pages/CryptoSearch/CryptoSearch'
import Graphs from './pages/Graphs/Graphs'
import Conversion from './pages/Conversion/Conversion'
import Bitcoin from './pages/Bitcoin/Bitcoin'
import NewsAndAnalysis from './pages/News/News'
import AccountDetails from './pages/AccountDetails/AccountDetails'
import ListUser from './pages/ListUser/ListUser'

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
            <Route path={PagesURLs.CryptoSearch} element={<CryptoSearch />} />
            <Route path={PagesURLs.Graphs} element={<Graphs />} />
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
            <Route path="/account-details/:userId" element={<AccountDetails />} />
            <Route path={PagesURLs.ListUser} element={<ListUser />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
