import { StyleSheet, Dimensions } from 'react-native';
import { Theme, ThemeContext } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: theme.metrics.x4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',    
    borderColor: theme.colors.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  btn: {
    flexDirection: 'row'
  },
  btnText: {
    fontSize: 18,
    lineHeight: 24,
    marginLeft: theme.metrics.x2
  },
  separator: {
      borderRightColor: theme.colors.gray,
      borderRightWidth: 1,      
      height: 40
  }
})