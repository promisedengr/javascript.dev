import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { fonts } from '~/ui/theme/default/fonts';
const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
 StyleSheet.create({
  button: {    
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',    
    marginHorizontal: theme.metrics.x4,
    marginVertical: theme.metrics.x2,
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.family.system,
    letterSpacing: -0.3
  },
  iconPos: {
    position: 'absolute',
    left: 16
  }
});