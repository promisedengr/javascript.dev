import {Options} from 'react-native-navigation';
import { colors } from '~/ui/theme/default/colors';

function LeftReviewOptions(): Options {
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
export {LeftReviewOptions};
