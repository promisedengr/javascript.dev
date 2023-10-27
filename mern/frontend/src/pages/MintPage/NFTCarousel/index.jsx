import carouselImage from 'assets/images/carousel.jpg';
import React from 'react';
import Carousel from 'react-multi-carousel';

import { Box } from '@mui/material';

const BREAKPOINTS = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 425 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 425, min: 0 },
    items: 1,
  },
};

function NFTCarousel({ sx }) {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: `url(${carouselImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        overflow: 'hidden',
        padding: '35px 0',
        marginBottom: '15px',
        ...sx,
      }}
    >
      <Box textAlign="center">
        <Carousel
          responsive={BREAKPOINTS}
          infinite
          autoPlay
          autoPlaySpeed={500}
          transitionDuration={500}
        >
          {Array(17)
            .fill()
            .map((_, i) => (
              <Box key={`NFTCarousel-${i}`}>
                <Box
                  component="img"
                  key={`Carousel${i}`}
                  src={require(`assets/images/nfts/${i + 1}.jpg`)}
                  alt={i}
                  sx={{
                    height: 'auto',
                    width: '90%',
                    margin: '0 15px',
                    boxShadow: '0 0 10px 5px rgba(219, 155, 19, 0.5)',
                  }}
                />
              </Box>
            ))}
        </Carousel>
      </Box>
    </Box>
  );
}

export default NFTCarousel;
