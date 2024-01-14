import { Route, Routes } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';
import Header from './components/global/Header';
import BlockInformation from './pages/BlockInformation';
import Footer from './components/global/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="bg-body-tertiary" style={{ minHeight: '88.4vh' }}>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/block/:blockHeight" element={<BlockInformation />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
