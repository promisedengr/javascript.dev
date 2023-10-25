import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height*0.05
  },
  fatalErrorText: {
    fontSize: 32,
    fontWeight: '600',
    marginTop: 200
  },
  grayText: {
    color: theme.colors.silver,
    fontSize: theme.fonts.sizes.h2,
    textAlign: 'center'
  },
  marginX4: {
    marginTop: theme.metrics.x4
  },
  largeButtonContainer: {
    width: '100%',
    height: 56,
    paddingHorizontal: theme.metrics.x4
  },
});