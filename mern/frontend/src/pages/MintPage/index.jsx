import sidebarURL from 'assets/images/widesidebar.jpg';
import MainContainer from 'components/MainContainer';
import MintStatus from 'pages/MintPage/MintStatus';
import NFTCarousel from 'pages/MintPage/NFTCarousel';
import RoadMap from 'pages/MintPage/RoadMap';
import SecretSauce from 'pages/MintPage/SecretSauce';
import TeamInfo from 'pages/MintPage/TeamInfo';
import Vault from 'pages/MintPage/Vault';
import { useEffect } from 'react';
import React from 'react';
import LazyLoad from 'react-lazyload';
import { store } from 'store';
import {
  setCurrentPhase,
  setCurrentTokenId,
  setPrice,
} from 'store/actions/globalActions';

import { Box } from '@mui/material';

function MintPage() {
  useEffect(() => {
    store.dispatch(setCurrentPhase());
    store.dispatch(setPrice());
    store.dispatch(setCurrentTokenId());
  }, []);

  return (
    <MainContainer>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <LazyLoad height={200}>
          <Box
            sx={{
              display: 'black',
              height: '80px',
              backgroundImage: `url(${sidebarURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left top',
              '@media (min-width: 768px)': {
                height: '120px',
              },
              '@media (min-width: 769px)': {
                display: 'none',
              },
            }}
          />
        </LazyLoad>
        <MintStatus />
        <NFTCarousel />
        <Box
          sx={{
            marginBottom: '13px',
            '@media (min-width: 769px)': {
              display: 'grid',
              columnGap: '35px',
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
          }}
        >
          <SecretSauce />
          <RoadMap />
        </Box>
        <Vault />
        <TeamInfo />
      </Box>
    </MainContainer>
  );
}

export default MintPage;
