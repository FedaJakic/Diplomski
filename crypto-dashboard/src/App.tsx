import { Route, Routes } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';
import BlockInformation from './pages/BlockInformation';
import Footer from './components/global/Footer';
import Transaction from './pages/Transaction';
import Header from './components/global/Header';
import Wallet from './pages/Wallet';

function App() {
  return (
    <>
      <Header />
      <main className="bg-body-tertiary" style={{ minHeight: '88.4vh' }}>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/block/:blockHeight" element={<BlockInformation />} />
          <Route path="/transaction/:transactionId" element={<Transaction />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
