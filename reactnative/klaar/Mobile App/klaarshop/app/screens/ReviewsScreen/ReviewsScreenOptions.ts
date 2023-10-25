import { Options } from 'react-native-navigation';
import { colors } from '~/ui/theme/default/colors';

function ReviewsScreenOptions(): Options {
   return {
      topBar: {
         visible: false,
      },
      animations: {
         push: {
            enabled: true
         },
         pop: {
            enabled: true
         }
      },
      statusBar: {
         backgroundColor: `transparent`,
         style: 'dark',
         drawBehind: true
      }

   };
}
export { ReviewsScreenOptions };
