import {Options} from 'react-native-navigation';
import {Colors} from '~/styles';

function FatalErrorScreenOptions(): Options {
  return {
    layout: {
      backgroundColor: Colors.white,
    },
    topBar: {
      visible: false,
    },
  };
}
export {FatalErrorScreenOptions};
