import { Options } from 'react-native-navigation';
import { colors } from '~/ui/theme/default/colors';

function ClientProfileScreenOptions() {
   return {
      layout: {
         backgroundColor: colors.white,
      },
      topBar: {
         visible: false,
      },
      statusBar: {
         backgroundColor: colors.white,
         drawBehind: true
      },
      gradient: [colors.white, colors.white]

   };
}

export { ClientProfileScreenOptions };