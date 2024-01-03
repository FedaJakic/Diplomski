import React from 'react';
import CreditCard from './CreditCard';

const WalletInfo = () => {
  return (
    <div>
      <p>
        Private Key:
        c7021f6010a158d46f65cfe36971b7f5a6f1c1e40c9867d0fb292c1b22eb9a14
      </p>
      <p>Address: bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq</p>
      <CreditCard />
    </div>
  );
};

export default WalletInfo;
