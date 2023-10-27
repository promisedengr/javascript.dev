import { createTheme } from '@mui/system';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      mobileS: 320,
      mobileM: 320,
      mobileL: 320,
      tablet: 768,
      laptop: 1024,
      laptopL: 1440,
      desktop: 1920,
    },
  },
});

export default theme;
