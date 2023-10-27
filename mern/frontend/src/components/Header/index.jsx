import laptopHeader from 'assets/images/header_laptop.jpg';
import mobileHeader from 'assets/images/header_mobile.jpg';
import tabletHeader from 'assets/images/header_tablet.jpg';
import menuImg from 'assets/images/menu.png';
import { useOnClickOutside } from 'hooks';
import React, { useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { toast } from 'react-toastify';

import { Box } from '@mui/material';

function Header() {
  const menuRef = useRef(null);
  const [isMenu, setIsMenu] = useState(false);
  const handleMenu = () => {
    setIsMenu(!isMenu);
  };
  useOnClickOutside(menuRef, () => setIsMenu(false));

  // const handleOpensea = () => {
  //   toast.info('Coming Soon!', {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 1500,
  //     hideProgressBar: true,
  //   });
  // };
  return (
    <LazyLoad height={200}>
      <Box
        sx={{
          height: '120px',
          width: '100%',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${mobileHeader})`,
          '@media (min-width: 768px)': {
            backgroundImage: `url(${tabletHeader})`,
            height: '200px',
          },
          '@media (min-width: 1024px)': {
            backgroundImage: `url(${laptopHeader})`,
            height: '300px',
          },
          '@media (min-width: 1920px)': {
            height: '400px',
          },
        }}
      >
        <Box
          ref={menuRef}
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            '@media (min-width: 375px)': {
              right: '20px',
              top: '20px',
            },
            '@media (min-width: 768px)': {
              right: '30px',
              top: '30px',
            },
            textAlign: 'right',
            zIndex: 10000,
          }}
          onClick={handleMenu}
        >
          <Box
            component="img"
            src={menuImg}
            sx={{
              height: '40px',
              width: '40px',
              '@media (min-width: 768px)': {
                height: '50px',
                width: '50px',
              },
              '@media (min-width: 1024px)': {
                height: '100px',
                width: '100px',
              },
              cursor: 'pointer',
            }}
          />
          {isMenu && (
            <Box
              sx={{
                backgroundColor: '#d89810',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              <Box
                component="a"
                target="_blank"
                href="https://twitter.com/SugarHeads_NFT"
                sx={{
                  fontFamily: 'LapsusBold',
                  letterSpacing: '4px',
                  '@media (min-width: 768px)': {
                    fontSize: '35px',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: '50px',
                  },
                  borderBottom: '2px solid black',
                  textDecoration: 'none',
                  color: '#1c1404',
                  display: 'block',
                }}
              >
                TWITTER
              </Box>
              <Box
                component="a"
                target="_blank"
                href="https://discord.com/invite/ZbQbQrar8g"
                sx={{
                  fontFamily: 'LapsusBold',
                  letterSpacing: '4px',
                  '@media (min-width: 768px)': {
                    fontSize: '35px',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: '50px',
                  },
                  borderBottom: '2px solid black',
                  textDecoration: 'none',
                  color: '#1c1404',
                  display: 'block',
                }}
              >
                DISCORD
              </Box>
              <Box
                component="a"
                target="_blank"
                href="https://opensea.io/collection/sugarheadsnft"
                sx={{
                  fontFamily: 'LapsusBold',
                  letterSpacing: '4px',
                  '@media (min-width: 768px)': {
                    fontSize: '35px',
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: '50px',
                  },
                  display: 'block',
                  textDecoration: 'none',
                  color: '#1c1404',
                }}
              >
                OPENSEA
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </LazyLoad>
  );
}

export default Header;
