import { useCountdown } from 'hooks/useCountDown';
import { useEffect } from 'react';
import { useState } from 'react';
import { store } from 'store';
import { setClaimable } from 'store/actions/globalActions';

import { Typography } from '@mui/material';

function Timer({ targetTime }) {
  const [days, hours, minutes, seconds] = useCountdown(targetTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (days + hours + minutes + seconds <= 0) {
      store.dispatch(setClaimable());
      setIsExpired(true);
    }
  }, [days, hours, minutes, seconds]);

  if (isExpired) {
    return (
      <Typography
        sx={{
          fontFamily: 'LapsusBold',
          fontSize: 20,
          color: '#db9b13',

          '@media (min-width: 768px)': {
            fontSize: 30,
          },
          '@media (min-width: 1024px)': {
            WebkitTextStroke: '2px black',
            fontSize: 40,
          },
          '@media (min-width: 1440px)': {
            fontSize: 60,
          },
          WebkitTextStroke: '1px black',
        }}
      >
        Expired
      </Typography>
    );
  } else {
    return (
      <Typography
        sx={{
          fontFamily: 'LapsusBold',
          fontSize: 15,
          color: '#db9b13',

          '@media (min-width: 768px)': {
            fontSize: 25,
          },
          '@media (min-width: 1024px)': {
            WebkitTextStroke: '2px black',
            fontSize: 25,
          },
          '@media (min-width: 1440px)': {
            fontSize: 45,
          },
          WebkitTextStroke: '1px black',
        }}
      >
        {days}d : {hours}h : {minutes}m : {seconds}s
      </Typography>
    );
  }
}

export default Timer;
