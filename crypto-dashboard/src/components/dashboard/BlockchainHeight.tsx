import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DashboardUrlsApi } from '../../api/dashboard/index';
import Typography from '@mui/material/Typography';
import BlockchainHeightSVG from './BlockchainHeightSVG';

const BlockchainHeight = () => {
  const [blockchainHeight, setBlockchainHeight] = useState('');

  useEffect(() => {
    DashboardUrlsApi.getBlockchainHeight()
      .then((res) => {
        setBlockchainHeight(res.blockCount);
      })
      .catch(() => console.log('Error fetching blockchain'));
  }, []);

  return (
    <Card
      style={{
        width: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardContent>
        <BlockchainHeightSVG />
        <Typography variant="body2">Blockchian height</Typography>
      </CardContent>
      <CardActions>
        {blockchainHeight && (
          <Typography variant="body1">{blockchainHeight}</Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default BlockchainHeight;
