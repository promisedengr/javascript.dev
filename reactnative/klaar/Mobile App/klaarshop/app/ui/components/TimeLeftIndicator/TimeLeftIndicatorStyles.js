import {StyleSheet} from 'react-native';
import { useThemeContext } from '~/ui/theme';

export const createStyle = (theme: Theme) =>
StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white
  },
  defaultText: {
    fontSize: 16
  },
  timerText: {
    fontSize: 16
  },
  timerContainer: {
    width: 70
  }
});