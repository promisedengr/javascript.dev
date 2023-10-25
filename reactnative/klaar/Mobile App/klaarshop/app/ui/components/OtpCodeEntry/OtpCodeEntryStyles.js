import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: '75%',
    alignSelf: 'center',
    //marginHorizontal: theme.metrics.x7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  digitInput: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: theme.fonts.sizes.h1,
    color: theme.colors.black
  },
  digitInputContainer: {
    borderColor: theme.colors.mainBlue,
    borderWidth: 0.5,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56
  }
});