import { Options } from 'react-native-navigation';
import { Colors } from '~/styles';
import { colors } from '~/ui/theme/default/colors';

function ProductInfoScreenOptions(): Options {
   return {
      layout: {
         backgroundColor: Colors.white,
      },
      topBar: {
         visible: false,
      },
      statusBar: {
         backgroundColor: `transparent`,
         style: 'dark',
         drawBehind: true
      }
   };
}
export { ProductInfoScreenOptions };