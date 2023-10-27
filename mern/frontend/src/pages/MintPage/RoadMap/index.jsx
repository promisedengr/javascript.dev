import roadmapImage from 'assets/images/roadmap.jpg';
import React from 'react';

import { Box } from '@mui/material';

function RoadMap() {
  return (
    <Box
      component="img"
      src={roadmapImage}
      sx={{ width: '100%', maxWidth: '100%' }}
    ></Box>
  );
}

export default RoadMap;
