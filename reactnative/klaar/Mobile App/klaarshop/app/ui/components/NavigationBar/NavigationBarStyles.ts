import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      barContainer: {
         width: '100%',
         height: 60,
         backgroundColor: theme.colors.white2,
         borderTopWidth: 1,
         borderColor: theme.colors.gray,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-around'
      },
   });