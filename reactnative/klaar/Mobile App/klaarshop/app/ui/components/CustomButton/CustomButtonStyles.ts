import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';

export const createStyle =(theme: Theme) => 
StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  relativeContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  buttonDescriptionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: theme.metrics.x3*2
  }
});