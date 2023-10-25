import { Options } from 'react-native-navigation';
import { Colors } from '~/styles';
import { colors } from '~/ui/theme/default/colors';

function PersonalDataScreenOptions(): Options {
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
export { PersonalDataScreenOptions }