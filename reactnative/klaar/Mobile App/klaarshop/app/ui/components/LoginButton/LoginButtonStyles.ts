import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';

export const createStyle = (theme: Theme) => 
StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: theme.colors.white,
    height: 56,
    borderWidth: 0.5,
    borderColor: theme.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center'
  }
});