import secretSauceImage from 'assets/images/secret_sauce.jpg';
import React from 'react';

import { Box } from '@mui/material';

function SecretSauce() {
  return (
    <Box
      component="img"
      src={secretSauceImage}
      sx={{ width: '100%', maxWidth: '100%' }}
    ></Box>
  );
}

export default SecretSauce;
