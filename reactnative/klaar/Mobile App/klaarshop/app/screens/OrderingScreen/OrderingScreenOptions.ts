import { Options } from 'react-native-navigation';
import { Colors } from '~/styles';

function OrderingScreenOptions(): Options {
   return {
      topBar: {
         visible: false
      },
      layout: {
         backgroundColor: Colors.white,
      },
      statusBar: {
         backgroundColor: `transparent`,
         style: 'dark',
         drawBehind: true
      }
   };
}
export { OrderingScreenOptions };