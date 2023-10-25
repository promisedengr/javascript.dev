import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from '~/ui/theme';

const { width: w, height: h } = Dimensions.get(`screen`)

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      preloader: {
         flex: 1,
         justifyContent: `center`,
         alignItems: `center`,
         zIndex: 9999
      }
   })