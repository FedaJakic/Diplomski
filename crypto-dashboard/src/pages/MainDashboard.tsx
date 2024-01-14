import React from 'react';
import LastBlocksInfos from '../components/dashboard/LastBlocksInfos';
import Container from 'react-bootstrap/esm/Container';

const MainDashboard: React.FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <LastBlocksInfos />
    </Container>
  );
};

export default MainDashboard;
