import body_tablet from 'assets/images/body_tablet.jpg';
import sidebarURL from 'assets/images/sidebar.jpg';
import Header from 'components/Header';
import React from 'react';
import LazyLoad from 'react-lazyload';

import { Box, Container } from '@mui/material';

function MainContainer({ children }) {
  return (
    <Box>
      <Header />
      <LazyLoad height={1000}>
        <Container
          disableGutters
          sx={{
            display: 'flex',
            padding: '0 15px',
            maxWidth: {
              lg: '2030px',
            },
            width: '100%',
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${body_tablet})`,
          }}
        >
          <Box
            sx={{
              display: 'none',
              width: '150px',
              backgroundImage: `url(${sidebarURL})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center top',
              backgroundRepeat: 'repeat',
              '@media (min-width: 769px)': {
                display: 'block',
              },
            }}
          />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              '@media (min-width: 769px)': {
                width: 'calc(100% - 165px)',
              },
            }}
          >
            {children}
          </Box>
        </Container>
      </LazyLoad>
    </Box>
  );
}

export default MainContainer;
