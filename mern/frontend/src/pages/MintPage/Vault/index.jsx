import exitImg from 'assets/images/exit.png';
import vaultImage from 'assets/images/vault_team_noletter.jpg';
import Timer from 'components/Timer';
import config from 'config';
import { useDisconnectWallet } from 'hooks';
import useFetch from 'hooks/useFetch';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { assetService } from 'services/blockchain/assetService';
import { store } from 'store';
import { useAppSelector } from 'store';
import {
  setCoins,
  setTokenIds,
  setUsedTokenIdsOf,
} from 'store/actions/globalActions';
import { getFloorPrice } from 'utils/alchemy';

import { Box, Button, Link, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const PRICE_URL = 'https://api.coingecko.com/api/v3/coins/';
const TYPE_PERIOD = '/market_chart?vs_currency=usd&days=30/interval=1m';

function Vault({ sx }) {
  const [prices, setPrices] = useState();
  const [floor, setFloor] = useState();
  const coinlist = [
    'chainlink',
    'shiba-inu',
    'dogelon-mars',
    'pax-gold',
    'quant-network',
    'hex',
    'usd-coin',
    'old-bitcoin',
    'laika',
    'ethereum',
  ];

  const getPriceData = async (coin) => {
    const res = await fetch(`${PRICE_URL}${coin}${TYPE_PERIOD}`);
    const { prices } = await res.json();
    return prices;
  };

  const coinPromises = coinlist.map((coin) => getPriceData(coin));

  const { active, account } = useWeb3React();
  const { tokenIds, claimable, coins, usedTokenIdsOf } = useAppSelector(
    (state) => state.global
  );
  const disconnectWallet = useDisconnectWallet();
  const { data, loading, error } = useFetch(`${config.apiBaseURL}coins`);
  const time = useFetch(`${config.apiBaseURL}time`);

  // useEffect(() => {
  //   setCoins();
  // }, []);

  // const getTokenBalance = async (address) => {
  //   const balance = parseInt(await assetService.getAssetBalance(address));
  //   console.log('bal', balance, address);
  //   return balance;
  // };

  const getAll = async () => {
    const res = await Promise.all(coinPromises);
    const lengths = res.map((item) => item.length);
    const minLength = Math.min(...lengths);
    const newRes = res.map((item) => item.map((val) => val[1]));
    let data = [];
    for (let i = 0; i < minLength; i++) {
      data.push({
        chainlink: newRes[0][i],
        'shiba-inu': newRes[1][i],
        'dogelon-mars': newRes[2][i],
        'pax-gold': newRes[3][i],
        'quant-network': newRes[4][i],
        hex: newRes[5][i],
        'usd-coin': newRes[6][i],
        'old-bitcoin': newRes[7][i],
        laika: newRes[8][i],
        ethereum: newRes[9][i],
      });
    }
    const newUSD = data.map((item) => {
      return {
        Vault:
          item['chainlink'] * 408 +
          item['shiba-inu'] * 100902622 +
          item['dogelon-mars'] * 3445238310 +
          item['pax-gold'] * 0.55 +
          item['quant-network'] * 21.5 +
          item['hex'] * 28404 +
          item['laika'] * 17412306698 +
          item['old-bitcoin'] * 27288 +
          item['usd-coin'] * 1000,
        Floor: item['ethereum'] * 0.035,
      };
    });
    console.log('data', data, newUSD);
    setPrices(newUSD.slice(-20));
  };

  const getFloor = async () => {
    const price = await getFloorPrice();
    setFloor(price);
  };

  useEffect(() => {
    if (active) {
      store.dispatch(setTokenIds(account));
      store.dispatch(setUsedTokenIdsOf(account));
      // config.tokens.map((token) => {
      //   getTokenBalance(token);
      // });
    }
  }, [active, account]);

  useEffect(() => {
    // getPriceData('chainlink');
    getAll();
    getFloor();
  }, []);

  const onClaim = async () => {
    const remain = tokenIds.filter((id) => !usedTokenIdsOf.includes(id));
    let tx;
    if (remain.length >= 100) {
      tx = await assetService.claimAsset(account, remain.slice(0, 100));
    } else {
      tx = await assetService.claimAsset(account, remain);
    }
    if (tx !== null) {
      toast.success('Successfully claimed!');
      store.dispatch(setUsedTokenIdsOf(account));
      store.dispatch(setTokenIds(account));
    }
  };

  const handleExit = async () => {
    await disconnectWallet();
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${vaultImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: '15px',
        ...sx,
      }}
    >
      {active && (
        <Box
          sx={{
            position: 'absolute',
            right: '15px',
            top: '135px',
            width: '25px',
            height: '25px',
            '@media (min-width: 375px)': {
              right: '25px',
              top: '135px',
              width: '30px',
              height: '30px',
            },
            '@media (min-width: 425px)': {
              right: '25px',
              top: '120px',
              width: '30px',
              height: '30px',
            },
            '@media (min-width: 768px)': {
              right: '35px',
              top: '175px',
              width: '45px',
              height: '45px',
            },
            '@media (min-width: 1024px)': {
              right: '50px',
              top: '235px',
              width: '60px',
            },
            '@media (min-width: 1440px)': {
              right: '50px',
              top: '215px',
              width: '70px',
              height: '70px',
            },
            '@media (min-width: 1920px)': {
              right: '70px',
              top: '240px',
              width: '80px',
            },
            cursor: 'pointer',
          }}
          onClick={handleExit}
        >
          <Box
            component="img"
            src={exitImg}
            sx={{
              width: '100%',
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          padding: '25px 0 40px 0',
          '@media (min-width: 375px)': {
            padding: '25px 0 30px 0',
          },
          '@media (min-width: 425px)': {
            padding: '20px 0',
          },
          '@media (min-width: 768px)': {
            padding: '30px 0',
          },
          '@media (min-width: 1024px)': {
            padding: '40px 0',
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
          THE VAULT
        </Typography>
      </Box>

      {time.data && (
        <Box
          sx={{
            position: 'absolute',
            right: '20px',
            top: '70px',
            '@media (min-width: 375px)': {
              right: '20px',
              top: '70px',
            },
            '@media (min-width: 425px)': {
              right: '20px',
              top: '72px',
            },
            '@media (min-width: 768px)': {
              right: '20px',
              top: '90px',
            },
            '@media (min-width: 1025px)': {
              right: '20px',
              top: '60px',
            },
            '@media (min-width: 1440px)': {
              transform: 'rotate(-10deg)',
              right: '20px',
              top: '50px',
            },
          }}
        >
          <Timer targetTime={time.data.lockTime} />
        </Box>
      )}
      {!active && (
        <Box
          sx={{
            display: 'grid',
            rowGap: 2,
            columnGap: 4,
            '@media (min-width: 1025px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
          }}
        >
          {config['assets'] &&
            config['assets'].map((asset, index) => (
              <Link
                key={`Vaults-Link${index}`}
                target="_blank"
                href={config['coinGeckoBaseUrl'] + asset['url']}
                sx={{
                  fontFamily: 'LapsusBold',
                  display: 'block',
                  color: 'black',
                  textDecoration: 'none',
                  fontSize: 25,
                  '@media (min-width: 768px)': {
                    WebkitTextStroke: '2px #d89810',
                    fontSize: 40,
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: 50,
                  },
                  WebkitTextStroke: '1px #d89810',
                }}
              >
                {`${asset['name']} (${asset['symbol']})`}
              </Link>
            ))}
        </Box>
      )}
      {active && (
        <Box
          sx={{
            marginTop: '20px',
            width: '90%',
            '@media (min-width: 1024px)': {
              marginTop: '50px',
            },
          }}
          flex
          flexBasis="column"
          alignItems="center"
        >
          <Box
            sx={{
              maxWidth: '700px',
              margin: 'auto',
            }}
          >
            {data &&
              data.map((coin, index) => {
                if (index === 2) {
                  return (
                    <Typography
                      key={`Asset-${index}`}
                      sx={{
                        fontFamily: 'LapsusBold',
                        fontSize: 23,
                        '@media (min-width: 425px)': {
                          fontSize: 25,
                        },
                        '@media (min-width: 768px)': {
                          WebkitTextStroke: '2px #d89810',
                          fontSize: 40,
                        },
                        '@media (min-width: 1024px)': {
                          fontSize: 50,
                        },
                        textAlign: 'left',
                        WebkitTextStroke: '1px #d89810',
                      }}
                    >
                      {`${coin.name}: ${Number(
                        ((tokenIds.length - usedTokenIdsOf.length) *
                          coin.amount) /
                          config.totalSupply
                      ).toFixed(0)} ${coin.symbol}`}
                    </Typography>
                  );
                } else {
                  return (
                    <Typography
                      key={`Asset-${index}`}
                      sx={{
                        fontFamily: 'LapsusBold',
                        fontSize: 23,
                        '@media (min-width: 425px)': {
                          fontSize: 25,
                        },
                        '@media (min-width: 768px)': {
                          WebkitTextStroke: '2px #d89810',
                          fontSize: 40,
                        },
                        '@media (min-width: 1024px)': {
                          fontSize: 50,
                        },
                        textAlign: 'left',
                        WebkitTextStroke: '1px #d89810',
                      }}
                    >
                      {`${coin.name}: ${Number(
                        ((tokenIds.length - usedTokenIdsOf.length) *
                          coin.amount) /
                          config.totalSupply
                      ).toFixed(4)} ${coin.symbol}`}
                    </Typography>
                  );
                }
              })}
          </Box>
          <Box textAlign="center">
            <Button
              sx={{
                marginTop: '30px',
                cursor: 'pointer',
                width: '70%',
                fontFamily: 'LapsusBold',
                fontSize: '20px',
                padding: '15px 10px',
                '@media (min-width: 768px)': {
                  marginTop: '70px',
                  fontSize: 40,
                },
                '@media (min-width: 1024px)': {
                  fontSize: 50,
                },
                color: '#fac718',
                backgroundColor: 'black',
                border: '10px solid white',
                borderRadius: '60px',
                maxWidth: '900px',
                lineHeight: '1',
                letterSpacing: '7px',
                transform: 'rotate(-5deg)',
                opacity:
                  claimable && tokenIds.length - usedTokenIdsOf.length !== 0
                    ? 1
                    : 0.3,
                '&:disabled': {
                  color: '#fac718',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              onClick={onClaim}
              disabled={
                !claimable || tokenIds.length - usedTokenIdsOf.length === 0
              }
            >
              CLAIM YOUR ASSETS NOW
            </Button>
          </Box>
        </Box>
      )}
      {/* {tokenIds}
      <LoadingButton
        disabled={!(active && claimable && tokenIds.length > 0)}
        onClick={onClaim}
        loading={isClaiming}
      >
        Claim
      </LoadingButton> */}
      <LineChart
        width={1300}
        height={500}
        data={prices}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Vault"
          stroke="blue"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Floor" stroke="green" />
        {/* <Line type="monotone" dataKey="dogelon-mars" stroke="#8884d8" />
        <Line type="monotone" dataKey="pax-gold" stroke="#8884d8" />
        <Line type="monotone" dataKey="quant-network" stroke="#8884d8" />
        <Line type="monotone" dataKey="hex" stroke="#8884d8" />
        <Line type="monotone" dataKey="usd-coin" stroke="#8884d8" />
        <Line type="monotone" dataKey="old-bitcoin" stroke="#8884d8" />
        <Line type="monotone" dataKey="laika" stroke="#8884d8" /> */}
      </LineChart>
    </Box>
  );
}

export default Vault;
