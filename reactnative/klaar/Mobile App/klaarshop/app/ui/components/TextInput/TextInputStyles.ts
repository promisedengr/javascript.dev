import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';
const { width } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      globalContainerStyle: {
         width: '100%',
         flexDirection: `column-reverse`,

      },
      containerStyle: {
         width: '100%',
         borderWidth: 0.5,
         paddingRight: metrics.x6,
         flexDirection: 'row',
         alignItems: 'center',
         paddingLeft: metrics.x6,
         overflow: 'hidden',
         maxHeight: 300,

         //borderBottomWidth: 1,

      },
      leftIconContainer: {
         position: 'absolute',
         left: metrics.x6
      },
      rightIconContainer: {
         position: 'absolute',
         right: metrics.x5
      },
      textField: {
         paddingBottom: metrics.x3,

         // backgroundColor: '#c9c9c9'
      },
      textFieldDefaultWidth: {
         width: '85%'
      },
      textFieldWide: {
         width: '100%'
      },
      labelText: {
         color: theme.colors.silver,
         fontSize: metrics.x2,
      },
      requiredMark: {
         color: theme.colors.red,
      },
      errorMsgContainer: {
         paddingLeft: metrics.x6,

      },
      errorMsg: {
         fontSize: metrics.x3
      },
      bottomLine: {
         marginHorizontal: metrics.x6,
         borderBottomWidth: theme.metrics.borderWidth,
         borderBottomColor: theme.colors.gray,
         alignSelf: `stretch`
      },
      bottomLineError: {
         borderBottomColor: theme.colors.red,
      }
   });