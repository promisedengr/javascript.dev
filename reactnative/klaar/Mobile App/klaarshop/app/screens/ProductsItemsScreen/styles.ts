import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
         /* width: width,
         height: height, */
         /* flexDirection: 'row',
         justifyContent: 'space-between',
         flexWrap: 'wrap', */
         //paddingBottom: theme.metrics.x7,
         /* paddingHorizontal: theme.metrics.x4 */
      },
      itemInvisible: {
         backgroundColor: 'transparent',
         width: '45%'
      },
      componentContainer: {
         width: '100%',
         marginVertical: height * 0.02,
         flexDirection: 'row',
         justifyContent: 'space-between'
      },
      half: {
         width: '48%'
      },
      cancelText: {
         color: colors.black,
         fontSize: 17,
         fontWeight: "400"
      }

   });