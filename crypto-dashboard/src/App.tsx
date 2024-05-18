import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainDashboard from './pages/MainDashboard'
import BlockInformation from './pages/BlockInformation'
import Footer from './components/global/Footer'
import Transaction from './pages/Transaction'
import Header from './components/global/Header'
import Sidebar from './components/global/Sidebar'
import Login from './pages/LoginAndRegistration/Login'
import Register from './pages/LoginAndRegistration/Register'

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main
          style={{ flex: 1, minHeight: '88.4vh', backgroundColor: '#f8f9fa' }}
        >
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/block/:blockHeight" element={<BlockInformation />} />
            <Route
              path="/transaction/:transactionId"
              element={<Transaction />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
