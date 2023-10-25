import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  horizontalLarge: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  widthSpaceBetween: {
    justifyContent: 'space-between'
  },
  loginButtonContainer: {
    width: '30%',
    marginTop: height*0.03
  },
});