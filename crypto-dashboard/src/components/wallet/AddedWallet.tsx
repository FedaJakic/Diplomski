import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCard from './CreditCard';
import WalletInfo from './WalletInfo';

const AddedWallet = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div style={{ width: '85%' }}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '60%', flexShrink: 0 }}>
            Wallet #1
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            created: 20/12/2023
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <WalletInfo />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '60%', flexShrink: 0 }}>
            Wallet #2
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            created: 20/12/2023
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <WalletInfo />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '60%', flexShrink: 0 }}>
            Wallet #3
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            created: 20/12/2023
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <WalletInfo />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '60%', flexShrink: 0 }}>
            Wallet #4
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            created: 20/12/2023
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <WalletInfo />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AddedWallet;
