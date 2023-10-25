import {Options} from 'react-native-navigation';
import {Colors} from '~/styles';

function PaymentScreenOptions(): Options {
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
export {PaymentScreenOptions};