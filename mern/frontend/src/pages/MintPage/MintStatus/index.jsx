import mintStatusImage from 'assets/images/mint.jpg';
import ConnectWalletButton from 'components/ConnectWalletButton';
import config from 'config';
import React from 'react';
import { useEffect } from 'react';
import { useAppSelector } from 'store';
import { setCurrentTokenId } from 'store/actions/globalActions';

import { Box, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

import MintBox from '../MintBox';

function MintStatus({ sx }) {
  const { active } = useWeb3React();
  const { price, currentTokenId } = useAppSelector((state) => state.global);

  useEffect(() => {
    setCurrentTokenId();
  }, [price, currentTokenId]);

  return (
    <Box
      sx={{
        width: '100%',
        ...sx,
      }}
    >
      {!active && (
        <Box
          sx={{
            backgroundImage: `url(${mintStatusImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            marginBottom: '15px',
            paddingBottom: '30px',
            '@media (min-width: 425px)': {},
            '@media (min-width: 769px)': {
              marginTop: '0',
              flexDirection: 'row',
              paddingBottom: '80px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ConnectWalletButton />
          </Box>
          <Box
            sx={{
              display: 'flex',
              maxWidth: '1000px',
              width: '80%',
              margin: '50px auto auto auto',
              justifyContent: 'space-between',
              position: 'relative',
              flexDirection: 'column',
              '@media (min-width: 769px)': {
                flexDirection: 'row',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto',
                '@media (min-width: 769px)': {
                  justifyContent: 'initial',
                  alignItems: 'initial',
                  margin: 'initial',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'LapsusBold',
                  color: '#d89810',
                  fontSize: 40,
                  marginRight: '50px',
                  '@media (min-width: 768px)': {
                    WebkitTextStroke: '3px black',
                    fontSize: 70,
                  },
                  '@media (min-width: 769px)': {
                    marginRight: 'initial',
                    paddingTop: '90px',
                    transform: 'rotate(-10deg)',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: 90,
                  },
                  WebkitTextStroke: '2px black',
                }}
              >
                {currentTokenId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'LapsusBold',
                  color: '#d89810',
                  fontSize: 30,
                  position: 'relative',
                  transform: 'initial',
                  left: 'initial',
                  '@media (min-width: 768px)': {
                    WebkitTextStroke: '3px black',
                    fontSize: 50,
                  },
                  '@media (min-width: 769px)': {
                    position: 'absolute',
                    left: '65px',
                    transform: 'rotate(-10deg)',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: 70,
                  },
                  WebkitTextStroke: '2px black',
                }}
              >
                Gone
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                margin: 'auto',
                alignItems: 'center',
                '@media (min-width: 769px)': {
                  paddingTop: '100px',
                  display: 'initial',
                  margin: 'initial',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'LapsusBold',
                  color: 'black',
                  fontSize: 40,
                  position: 'relative',
                  marginRight: '30px',
                  '@media (min-width: 768px)': {
                    WebkitTextStroke: '3px #d89810',
                    fontSize: 70,
                  },
                  '@media (min-width: 769px)': {
                    top: -20,
                    right: '40px',
                    position: 'absolute',
                    marginRight: 'initial',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: 90,
                  },
                  WebkitTextStroke: '2px #d89810',
                }}
              >
                {config.totalSupply - currentTokenId}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'LapsusBold',
                  color: 'black',
                  fontSize: 30,
                  transform: 'initial',
                  padding: 0,
                  '@media (min-width: 768px)': {
                    WebkitTextStroke: '3px #d89810',
                    fontSize: 50,
                  },
                  '@media (min-width: 769px)': {
                    transform: 'rotate(8deg)',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: 70,
                  },
                  WebkitTextStroke: '2px #d89810',
                }}
              >
                Remaining
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {active && <MintBox />}
    </Box>
  );
}

export default MintStatus;
