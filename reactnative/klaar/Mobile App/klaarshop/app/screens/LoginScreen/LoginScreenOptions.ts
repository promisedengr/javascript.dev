import { Colors } from '~/styles';
import { colors } from '~/ui/theme/default/colors';

function LoginScreenOptions() {
   return {
      layout: {
         backgroundColor: Colors.white,
      },
      topBar: {
         visible: false,
      },
      statusBar: {
         backgroundColor: colors.white,
         style: 'dark'
      },
      gradient: [colors.white, colors.white]
   };
}

export { LoginScreenOptions };