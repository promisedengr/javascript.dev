import { Options } from 'react-native-navigation';
import { colors } from '~/ui/theme/default/colors';

function BuyHistoryScreenOptions(): Options {
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
export { BuyHistoryScreenOptions };
