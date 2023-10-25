import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';

export const createStyle = (theme: Theme) =>
 StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: metrics.borderWidth,
    borderColor: theme.colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.x6
  },
  defaultText: {
    fontSize: metrics.x4
  },
  timerText: {
    fontSize: metrics.x4
  },
  timerContainer: {
    width: 70
  }
});