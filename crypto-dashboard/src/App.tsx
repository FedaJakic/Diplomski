import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainSidebar from './components/global/MainSidebar';
import WalletPage from './pages/WalletPage';
import { Grid } from '@mui/material';
import MainDashboard from './pages/MainDashboard';

function App() {
  return (
    <Grid container>
      <Grid item>
        <MainSidebar />
      </Grid>
      <Grid item xs>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
