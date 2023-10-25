import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '~/ui/theme';

const { width, height } = Dimensions.get('window');

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
         alignItems: 'center',
      },
      scrollviewStyle: {
         width: width,
         paddingHorizontal: theme.metrics.x4,
         flex: 1
      },
      defaultBlock: {
         width: `100%`,
         paddingVertical: theme.metrics.x6,
      },
      borderTop: {
         borderTopWidth: 1,
         borderColor: theme.colors.lightGray
      },
      grayHeaderText: {
         fontSize: theme.fonts.sizes.h4,
         textTransform: 'uppercase',
         color: 'rgba(60, 60, 67, 0.6)',
         marginBottom: theme.metrics.x4
      },
      photoContainer: {
         width: 79,
         height: 79,
         marginBottom: 9,
         borderRadius: 30,
         justifyContent: 'center',
         alignItems: 'center'
      },
      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      buttonLink: {
         width: '100%',
         marginTop: theme.metrics.x2,
         height: 56
      },
      buttonSave: {
         width: '100%',
         marginBottom: theme.metrics.x6,
         paddingHorizontal: theme.metrics.x4,
         height: 56
      },
      marginTopx2: {
         marginTop: theme.metrics.x2,
      }
   });