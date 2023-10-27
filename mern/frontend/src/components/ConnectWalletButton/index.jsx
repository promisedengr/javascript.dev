import config from 'config';
import { useConnectWallet, useSwitchChain } from 'hooks';
import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const ConnectWalletButton = () => {
  const connectWallet = useConnectWallet();
  const switchChain = useSwitchChain();
  const { chainId } = useWeb3React();
  const handleConnect = async () => {
    await connectWallet();
  };
  useEffect(() => {
    if (!chainId && chainId !== config.chainId) {
      switchChain(config.chainId);
    }
  }, [chainId, switchChain]);

  return (
    <React.Fragment>
      <Button
        onClick={handleConnect}
        sx={{
          marginTop: '50px',
          fontFamily: 'LapsusBold',
          fontSize: '20px',
          padding: '5px 5px',
          letterSpacing: '2px',
          '@media (min-width: 375px)': {
            border: '7px solid white',
            letterSpacing: '3px',
            fontSize: '25px',
            padding: '5px 5px',
            width: '70%',
          },
          '@media (min-width: 425px)': {
            border: '7px solid white',
            letterSpacing: '5px',
            fontSize: '30px',
            padding: '5px 15px',
            width: '70%',
          },
          '@media (min-width: 768px)': {
            border: '10px solid white',
            letterSpacing: '8px',
            fontSize: '40px',
          },
          '@media (min-width: 1024px)': {
            fontSize: '60px',
          },
          color: '#fac718',
          backgroundColor: 'black',
          border: '5px solid white',
          borderRadius: '60px',
          maxWidth: '1000px',
          lineHeight: '1.2',
          width: '80%',
          transform: 'rotate(-5deg)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        CONNECT WALLET & MINT NOW!
      </Button>
    </React.Fragment>
  );
};

export default ConnectWalletButton;
