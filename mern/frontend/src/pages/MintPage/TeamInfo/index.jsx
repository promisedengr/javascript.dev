import teamImage from 'assets/images/vault_team_noletter.jpg';
import config from 'config';
import React from 'react';

import { Box, Typography } from '@mui/material';

function TeamInfo({ sx }) {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: `url(${teamImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        ...sx,
        margin: '0',
        padding: '0 0 50px 0',
        '@media (min-width: 425px)': {
          padding: '0 0 50px 0',
        },
        '@media (min-width: 768px)': {
          padding: '0 0 50px 0',
        },
        '@media (min-width: 1024px)': {
          padding: '0 0 100px 0',
        },
        '@media (min-width: 1440px)': {
          padding: '0 0 100px 0',
        },
        '@media (min-width: 1920px)': {
          padding: '0 0 100px 0',
        },
      }}
    >
      <Box
        sx={{
          padding: '30px 0 40px 0',
          '@media (min-width: 375px)': {
            padding: '25px 0 30px 0',
          },
          '@media (min-width: 425px)': {
            padding: '25px 0',
          },
          '@media (min-width: 768px)': {
            padding: '14px 0',
          },
          '@media (min-width: 1024px)': {
            padding: '25px 0',
          },
          '@media (min-width: 1440px)': {
            padding: '15px 0',
          },
          '@media (min-width: 1920px)': {
            padding: '30px 0',
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'LapsusBold',
            color: '#db9b13',
            textDecoration: 'none',
            fontSize: 30,
            letterSpacing: 7,
            textAlign: 'center',
            '@media (min-width: 375px)': {
              fontSize: 40,
              letterSpacing: 10,
            },
            '@media (min-width: 425px)': {
              fontSize: 40,
              letterSpacing: 10,
            },
            '@media (min-width: 768px)': {
              fontSize: 60,
              letterSpacing: 10,
            },
            '@media (min-width: 1024px)': {
              fontSize: 70,
              letterSpacing: 10,
            },
            '@media (min-width: 1440px)': {
              fontSize: 90,
              letterSpacing: 15,
            },
            '@media (min-width: 1920px)': {
              fontSize: 110,
              letterSpacing: 20,
            },
          }}
        >
          THE TEAM
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          justifyItems: 'center',
          rowGap: '40px',
          marginTop: '20px',
          gridTemplateColumns: 'repeat(2, 1fr)',
          rowGap: '20px',
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}
      >
        {config.team &&
          config.team.map((member, i) => (
            <Box
              component="a"
              href={`${member.url}`}
              target="_blank"
              key={`TeamInfo-${i}`}
            >
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  width: '130px',
                  '@media (min-width: 768px)': {
                    width: '200px',
                  },
                  '@media (min-width: 1024px)': {
                    width: '250px',
                  },
                }}
                src={require(`assets/images/team/${i + 1}.jpg`)}
                alt={i}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default TeamInfo;
