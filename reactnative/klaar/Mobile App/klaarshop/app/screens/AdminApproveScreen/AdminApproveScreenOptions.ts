import { Options } from 'react-native-navigation';
import { colors } from '~/ui/theme/default/colors';

function AdminApproveScreenOptions(): Options {
   return {
      topBar: {
         visible: false,
      },
      animations: {
         push: {
            enabled: true
         },
         pop: {
            enabled: false
         }
      },
      statusBar: {
         backgroundColor: `transparent`,
         style: 'dark',
         drawBehind: true
      }

   };
}
export { AdminApproveScreenOptions };
