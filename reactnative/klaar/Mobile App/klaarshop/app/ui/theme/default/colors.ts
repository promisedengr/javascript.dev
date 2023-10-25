const orange = `#F08626`;
const lightOrange = '#FF8500';
const lightGray = '#E1E1E1';
const white2 = '#FBFCFF';
const black = '#000000';
const white = '#fff';
const silver = '#979CA0';
const gray = "#CCC";
const darkGray = '#292929';
const lightGray2 = '#F0F0F0';
const gray3 = '#87888D';
const lightGray1 = '#e3e3e3'
const gray1 = '#3C3C43';
const gray2 = '#c4c4c4'
const green = '#33BA41';
const green1 = '#4CD964';
const red = '#F20202';
const red2 = `#FD5757`
const error = '#F42222';
const darkBlue = '#395185';
const blue = '#5181B8';
const lightBlue = '#1E96C8';
const lightGreen = '#3ADF57';
const background = '#EAEBEE';
const boxDescription = 'rgba(60, 60, 67, 0.6)';
const gray4 = '#E3E3E3';
const gray5 = '#656565';
const black2 = '#292929';
const black3 = '#030303';
const gray6 = '#C8C8C8';
const lightBlue2 = `#3CB8FF`
const lightGray3 = `#F8F9FC`
const gray7 = `#979CA0`
const paleBlue = `#E7F2FF`
const mainBlue = lightBlue2
const dark = '#12121D';
const gray8 = 'rgba(18, 18, 29, 0.05)';
const gray9 = 'rgba(18, 18, 29, 0.1)';
const grayStatusBar = `#F4F5F9`
const grape = `#592E59`
const avocado = `#B8D4A6`
const blue2 = `#2F80ED`
const transparent = 'transparent';

const palette = {
   blue2,
   avocado,
   gray8,
   gray9,
   dark,
   blue,
   green,
   red,
   red2,
   black,
   transparent,
   black2,
   black3,
   lightOrange,
   silver,
   lightGray,
   white,
   error,
   darkBlue,
   lightGreen,
   lightBlue,
   orange,
   background,
   gray,
   gray1,
   gray2,
   darkGray,
   lightGray1,
   boxDescription,
   gray3,
   gray4,
   gray5,
   gray6,
   white2,
   gray7,
   green1,
   lightGray2,
   lightBlue2,
   lightGray3,
   paleBlue,
   mainBlue,
   grayStatusBar,
   grape
} as const;

const colors = {
   text: palette.black,
   ...palette,
} as const;

const gradients = {
   g1: ['rgba(255,255,255,.01)', palette.white],
   g2: {
      colors: ['rgba(149,152,162,0.1)', palette.white, 'rgba(149,152,162,0.1)'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
   },
   g3: ['#F4F5F9', '#FBFCFF']
};

export { colors, gradients };
