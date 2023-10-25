import { StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: '100%',
         paddingBottom: metrics.x5,
         paddingTop: metrics.x6,
         borderTopWidth: metrics.borderWidth,
         borderBottomWidth: metrics.borderWidth,
         borderColor: theme.colors.lightGray1,
         paddingHorizontal: '5%'
      },
      categoryText: {
         color: theme.colors.silver,
         fontSize: 13,
         textTransform: 'uppercase'
      },
      nameText: {
         fontSize: metrics.x6,
         marginTop: 15,
         marginBottom: 30
      },
      descriptionText: {
         color: theme.colors.darkGray,
         fontSize: 14,
         marginTop: 15
      },
      showMoreToogleText: {
         color: `#3cb8ff`,
         fontSize: 14
      },
      flexEndContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-end'
      },
      titleWrapper: {
         flexDirection: `row`, justifyContent: `space-between`
      }
   });