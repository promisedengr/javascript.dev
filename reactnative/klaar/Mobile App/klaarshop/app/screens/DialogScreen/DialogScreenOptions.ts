import { Options } from 'react-native-navigation';

function DialogScreenOptions(): Options {
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
export { DialogScreenOptions };
