import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      headerContainer: {
         width: '100%',
         minHeight: 60,
         flexDirection: 'row',
         paddingVertical: theme.metrics.x3,
         justifyContent: 'space-between',
         alignItems: 'center',
         borderStyle: 'solid'

      },
      headerTitle: {
         fontFamily: "System",
         width: 280,
         textAlign: 'center'
      },
      headerSideContainer: {
         flexDirection: 'row',
         alignItems: 'center',
      },
      headerRightFlex: {
         justifyContent: 'flex-end',
         alignItems: `center`
      },
      headerCenterContainer: {
         width: '40%',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      arrowBackContainer: {
         paddingLeft: 5,
         paddingRight: 20
      }
   });