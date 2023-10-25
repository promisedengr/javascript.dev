import { StyleSheet, Dimensions } from 'react-native';
import { Theme, ThemeContext } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      itemInvisible: {
         backgroundColor: 'transparent',
         width: '45%'
      },
      itemsContainer: {
         flexGrow: 1,
         marginHorizontal: theme.metrics.x2
      },
      itemContainer: {
         flex: .5,
         margin: theme.metrics.x2,
      }
   })