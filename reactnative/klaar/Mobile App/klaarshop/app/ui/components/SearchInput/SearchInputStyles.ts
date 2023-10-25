import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';

export const createStyle = (theme: Theme) => 
StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: metrics.borderWidth,
    borderColor: theme.colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingTop: metrics.x05,
    justifyContent: `center`
    
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  searchIconContainer: {
    position: 'absolute',
    left: 10
  },
  closeSearchIcon: {
    position: 'absolute',
    right: 10
  }
})