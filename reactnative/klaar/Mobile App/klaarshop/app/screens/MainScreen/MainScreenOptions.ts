import { Options } from 'react-native-navigation';
import { colors } from '~/ui/theme/default/colors';


function MainScreenOptions(): Options {
   return {
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
export { MainScreenOptions };
