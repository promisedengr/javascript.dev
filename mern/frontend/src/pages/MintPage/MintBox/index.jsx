import exitImg from 'assets/images/exit.png';
import mintImg from 'assets/images/mint.gif';
import mintBox from 'assets/images/mint.jpg';
import { useDisconnectWallet } from 'hooks';
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { sugarHeadService } from 'services/blockchain/sugarHeadService';
import { useAppSelector } from 'store';
import { store } from 'store';
import { setCurrentTokenId, setTokenIds } from 'store/actions/globalActions';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useWeb3React } from '@web3-react/core';

const useStyles = makeStyles({
  customOutline: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#db9b13',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#db9b13',
    },
  },
});

function MintBox({ sx }) {
  const [mintNumber, setMintNumber] = useState(0);
  const [free, setFree] = useState(0);
  const [earlyMinter, setEarlyMinter] = useState(true);
  const [isEarly, setIsEarly] = useState(false);

  const disconnectWallet = useDisconnectWallet();

  const { active, account } = useWeb3React();
  const { price, currentPhase } = useAppSelector((state) => state.global);

  const classes = useStyles();

  const onMint = async () => {
    if (!active) {
      toast.error("Metamask isn't connected.");
      return;
    }
    let tx;
    if (currentPhase === 0 && earlyMinter) {
      console.log('Early Mint');
      tx = await sugarHeadService.buyNFTEarly(account, mintNumber, price);
    }
    if (currentPhase === 0 && earlyMinter === false && free !== 0) {
      console.log('Free Mint');
      tx = await sugarHeadService.buyNFTForFree(account);
    }
    if (currentPhase === 1) {
      console.log('Public Mint');
      tx = await sugarHeadService.buyNFTsInPublic(account, mintNumber, price);
    }
    if (tx !== null) {
      if (currentPhase === 0 && earlyMinter === false) {
        toast.success('YOU MINTED YOUR FREE NFTs!');
      } else {
        toast.success('Successfully bought!');
      }
      store.dispatch(setCurrentTokenId());
      store.dispatch(setTokenIds(account));
    }
  };

  const handleChange = (e) => {
    setMintNumber(e.target.value);
  };

  const handleRadioChange = (e) => {
    if (e.target.value !== 'female') {
      setEarlyMinter(true);
    } else {
      setEarlyMinter(false);
    }
  };

  const handleExit = async () => {
    await disconnectWallet();
  };

  const getFreeMintNumber = async (address) => {
    const res = await sugarHeadService.getFreeMintNumber(address);
    setFree(parseInt(res, 10));
  };

  const isEarlyMinter = async (address) => {
    const res = await sugarHeadService.checkIsEarlyMinter(address);
    setIsEarly(res);
    setEarlyMinter(res);
  };

  useEffect(() => {
    getFreeMintNumber(account);
    isEarlyMinter(account);
  }, [account]);
  console.log('early', isEarly, earlyMinter);

  const showingAmount = isEarly && earlyMinter;

  return (
    <Box
      sx={{
        backgroundImage: `url(${mintBox})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        position: 'relative',
        marginBottom: '15px',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: '5px',
          top: '25px',
          width: '25px',
          height: '25px',
          '@media (min-width: 375px)': {
            right: '15px',
            top: '20px',
            width: '30px',
            height: '30px',
          },
          '@media (min-width: 425px)': {
            right: '15px',
            top: '40px',
            width: '30px',
            height: '30px',
          },
          '@media (min-width: 768px)': {
            right: '15px',
            top: '35px',
            width: '45px',
            height: '45px',
          },
          '@media (min-width: 1024px)': {
            width: '50px',
            height: '50px',
          },
          '@media (min-width: 1440px)': {
            right: '40px',
            top: '40px',
            width: '70px',
            height: '70px',
          },
          '@media (min-width: 1920px)': {
            right: '40px',
            top: '50px',
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
      <Box
        textAlign="center"
        sx={{
          padding: '15px 10px',
          '@media (min-width: 425px)': {
            padding: '30px 20px',
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'LapsusBold',
            fontSize: 30,
            color: 'black',
            maxWidth: '330px',
            margin: 'auto',
            letterSpacing: '0px',
            '@media (min-width: 375px)': {
              maxWidth: '270px',
              fontSize: 35,
              WebkitTextStroke: '2px #db9b13',
            },
            '@media (min-width: 425px)': {
              maxWidth: '300px',
              fontSize: 35,
              WebkitTextStroke: '2px #db9b13',
            },
            '@media (min-width: 768px)': {
              maxWidth: 'initial',
              margin: 'initial',
              fontSize: 35,
              WebkitTextStroke: '2px #db9b13',
            },
            '@media (min-width: 1024px)': {
              fontSize: 40,
            },
            '@media (min-width: 1440px)': {
              fontSize: 60,
            },
            '@media (min-width: 1920px)': {
              fontSize: 80,
            },
            WebkitTextStroke: '1px #db9b13',
          }}
        >
          MINT YOUR NFTs!(0.03 ETH EACH)
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            order: 1,
            flexDirection: 'column',
            '@media (min-width: 768px)': {
              padding: '50px 0 50px 0',
              order: 0,
            },
            justifyContent: 'center',
            alignItems: 'center',
          }}
          pb="50px"
        >
          {currentPhase === 1 && (
            <Box width="100%" textAlign="center">
              <Typography
                sx={{
                  fontFamily: 'LapsusBold',
                  margin: '20px 0',
                  fontSize: 20,
                  color: 'black',
                  '@media (min-width: 425px)': {
                    fontSize: 26,
                    letterSpacing: '1px',
                    WebkitTextStroke: '2px #db9b13',
                  },
                  '@media (min-width: 768px)': {
                    fontSize: 30,
                  },
                  '@media (min-width: 1024px)': {
                    WebkitTextStroke: '3px #db9b13',
                    fontSize: 33,
                  },
                  '@media (min-width: 1440px)': {
                    fontSize: 50,
                  },
                  WebkitTextStroke: '1px #db9b13',
                }}
              >
                CHOOSE HOW MANY NFTs
              </Typography>
              <FormControl
                sx={{
                  width: '200px',
                  margin: 'auto',
                  '@media (min-width: 768px)': {
                    fontSize: 30,
                  },
                  '@media (min-width: 1024px)': {
                    fontSize: 35,
                  },
                  '& .MuiFormLabel-root': {
                    color: '#db9b13',
                  },
                }}
              >
                <InputLabel
                  id="mint-select-label"
                  sx={{
                    fontFamily: 'LapsusBold',
                    fontSize: '1em',
                    color: '#db9b13',
                    lineHeight: '1',
                    top: '5px',
                    '&.Mui-focused': {
                      top: '-3px',
                      color: '#db9b13',
                    },
                  }}
                >
                  Amount
                </InputLabel>
                <Select
                  className={classes.customOutline}
                  labelId="mint-select-label"
                  label="Amount"
                  onChange={handleChange}
                  sx={{
                    fontFamily: 'LapsusBold',
                    fontSize: '1em',
                    textAlign: 'left',
                    color: '#db9b13',
                    letterSpacing: '2px',
                  }}
                >
                  <MenuItem value={1} sx={{ fontFamily: 'LapsusBold' }}>
                    1 NFT
                  </MenuItem>
                  <MenuItem value={2} sx={{ fontFamily: 'LapsusBold' }}>
                    2 NFTs
                  </MenuItem>
                  <MenuItem value={3} sx={{ fontFamily: 'LapsusBold' }}>
                    3 NFTs
                  </MenuItem>
                  <MenuItem value={4} sx={{ fontFamily: 'LapsusBold' }}>
                    4 NFTs
                  </MenuItem>
                  <MenuItem value={5} sx={{ fontFamily: 'LapsusBold' }}>
                    5 NFTs
                  </MenuItem>
                  <MenuItem value={6} sx={{ fontFamily: 'LapsusBold' }}>
                    6 NFTs
                  </MenuItem>
                  <MenuItem value={7} sx={{ fontFamily: 'LapsusBold' }}>
                    7 NFTs
                  </MenuItem>
                  <MenuItem value={8} sx={{ fontFamily: 'LapsusBold' }}>
                    8 NFTs
                  </MenuItem>
                  <MenuItem value={9} sx={{ fontFamily: 'LapsusBold' }}>
                    9 NFTs
                  </MenuItem>
                  <MenuItem value={10} sx={{ fontFamily: 'LapsusBold' }}>
                    10 NFTs
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          {currentPhase === 0 && (
            <Box>
              <FormControl>
                <FormLabel
                  sx={{
                    fontFamily: 'LapsusBold',
                    fontSize: 30,
                    '@media (min-width: 768px)': {
                      fontSize: 40,
                    },
                    '@media (min-width: 1024px)': {
                      WebkitTextStroke: '2px #db9b13',
                      fontSize: 50,
                    },
                    '@media (min-width: 1440px)': {
                      fontSize: 60,
                    },
                    color: 'black',
                    WebkitTextStroke: '1px #db9b13',
                    '&.Mui-focused': {
                      color: 'black',
                    },
                  }}
                >
                  WHITELIST MINT
                </FormLabel>
                {isEarly && free !== 0 && (
                  <RadioGroup
                    defaultValue={isEarly ? 'male' : 'female'}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Early"
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: 'LapsusBold',
                          fontSize: 20,
                          '@media (min-width: 768px)': {
                            fontSize: 30,
                          },
                          '@media (min-width: 1024px)': {
                            WebkitTextStroke: '2px #db9b13',
                            fontSize: 40,
                          },
                          '@media (min-width: 1440px)': {
                            fontSize: 50,
                          },
                          WebkitTextStroke: '1px #db9b13',
                        },
                      }}
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label={<Box component="span">Free ({free})</Box>}
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: 'LapsusBold',
                          fontSize: 20,
                          '@media (min-width: 768px)': {
                            fontSize: 30,
                          },
                          '@media (min-width: 1024px)': {
                            fontSize: 40,
                            WebkitTextStroke: '2px #db9b13',
                          },
                          '@media (min-width: 1440px)': {
                            fontSize: 50,
                          },
                          WebkitTextStroke: '1px #db9b13',
                        },
                      }}
                    />
                  </RadioGroup>
                )}
                {!isEarly && free === 0 && (
                  <Typography
                    sx={{
                      fontFamily: 'LapsusBold',
                      fontSize: 20,
                      '@media (min-width: 768px)': {
                        fontSize: 30,
                      },
                      '@media (min-width: 1024px)': {
                        WebkitTextStroke: '2px #db9b13',
                        fontSize: 40,
                      },
                      '@media (min-width: 1440px)': {
                        fontSize: 50,
                      },
                      WebkitTextStroke: '1px #db9b13',
                    }}
                  >
                    NOT WHITELISTED!
                  </Typography>
                )}
                {isEarly && free === 0 && (
                  <RadioGroup
                    defaultValue={isEarly ? 'male' : 'female'}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Early"
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: 'LapsusBold',
                          fontSize: 20,
                          '@media (min-width: 768px)': {
                            fontSize: 30,
                          },
                          '@media (min-width: 1024px)': {
                            WebkitTextStroke: '2px #db9b13',
                            fontSize: 40,
                          },
                          '@media (min-width: 1440px)': {
                            fontSize: 50,
                          },
                          WebkitTextStroke: '1px #db9b13',
                        },
                      }}
                    />
                  </RadioGroup>
                )}
                {!isEarly && free !== 0 && (
                  <RadioGroup
                    defaultValue={isEarly ? 'male' : 'female'}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label={<Box component="span">Free ({free})</Box>}
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: 'LapsusBold',
                          fontSize: 20,
                          '@media (min-width: 768px)': {
                            fontSize: 30,
                          },
                          '@media (min-width: 1024px)': {
                            fontSize: 40,
                            WebkitTextStroke: '2px #db9b13',
                          },
                          '@media (min-width: 1440px)': {
                            fontSize: 50,
                          },
                          WebkitTextStroke: '1px #db9b13',
                        },
                      }}
                    />
                  </RadioGroup>
                )}
              </FormControl>
              {showingAmount && (
                <Box>
                  <FormControl
                    sx={{
                      width: '200px',
                      margin: 'auto',
                      '@media (min-width: 768px)': {
                        fontSize: 30,
                      },
                      '@media (min-width: 1024px)': {
                        fontSize: 35,
                      },
                      '& .MuiFormLabel-root': {
                        color: '#db9b13',
                      },
                    }}
                  >
                    <InputLabel
                      id="mint-select-label"
                      sx={{
                        fontFamily: 'LapsusBold',
                        fontSize: '1em',
                        color: '#db9b13',
                        lineHeight: '1',
                        top: '5px',
                        '&.Mui-focused': {
                          top: '-3px',
                          color: '#db9b13',
                        },
                      }}
                    >
                      Amount
                    </InputLabel>
                    <Select
                      className={classes.customOutline}
                      labelId="mint-select-label"
                      label="Amount"
                      onChange={handleChange}
                      sx={{
                        fontFamily: 'LapsusBold',
                        fontSize: '1em',
                        textAlign: 'left',
                        color: '#db9b13',
                        letterSpacing: '2px',
                      }}
                    >
                      <MenuItem value={1} sx={{ fontFamily: 'LapsusBold' }}>
                        1 NFT
                      </MenuItem>
                      <MenuItem value={2} sx={{ fontFamily: 'LapsusBold' }}>
                        2 NFTs
                      </MenuItem>
                      <MenuItem value={3} sx={{ fontFamily: 'LapsusBold' }}>
                        3 NFTs
                      </MenuItem>
                      <MenuItem value={4} sx={{ fontFamily: 'LapsusBold' }}>
                        4 NFTs
                      </MenuItem>
                      <MenuItem value={5} sx={{ fontFamily: 'LapsusBold' }}>
                        5 NFTs
                      </MenuItem>
                      <MenuItem value={6} sx={{ fontFamily: 'LapsusBold' }}>
                        6 NFTs
                      </MenuItem>
                      <MenuItem value={7} sx={{ fontFamily: 'LapsusBold' }}>
                        7 NFTs
                      </MenuItem>
                      <MenuItem value={8} sx={{ fontFamily: 'LapsusBold' }}>
                        8 NFTs
                      </MenuItem>
                      <MenuItem value={9} sx={{ fontFamily: 'LapsusBold' }}>
                        9 NFTs
                      </MenuItem>
                      <MenuItem value={10} sx={{ fontFamily: 'LapsusBold' }}>
                        10 NFTs
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Box>
          )}
          <Button
            onClick={onMint}
            disabled={!isEarly && free === 0 && currentPhase === 0}
            sx={{
              fontFamily: 'LapsusBold',
              fontSize: 20,
              padding: '10px 20px',
              '@media (min-width: 425px)': {
                fontSize: 30,
              },
              '@media (min-width: 768px)': {
                fontSize: 40,
              },
              '@media (min-width: 1024px)': {
                fontSize: 50,
              },
              color: 'black',
              backgroundColor: '#db9b13',
              border: '7px solid white',
              borderRadius: '60px',
              maxWidth: '1000px',
              lineHeight: '1',
              letterSpacing: '5px',
              transform: 'rotate(-5deg)',
              marginTop: '150px',
              marginTop: '50px',
              '&:hover': {
                backgroundColor: 'rgba(216,152,16, 0.7)',
              },
            }}
          >
            MINT NOW!
          </Button>
        </Box>
        <Box
          sx={{
            overflow: 'hidden',
            padding: '0 15px',
            textAlign: 'center',
            margin: 'auto',
          }}
        >
          <Box
            component="img"
            src={mintImg}
            sx={{
              boxShadow: '0 0 10px 5px rgba(219, 155, 19, 0.5)',
              width: '250px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default MintBox;
