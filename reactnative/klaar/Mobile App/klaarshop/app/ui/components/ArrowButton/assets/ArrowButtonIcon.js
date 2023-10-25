import Svg, {
   Path
} from 'react-native-svg';
import React from 'react';
import { colors } from '~/ui/theme/default/colors';
import { metrics } from '~/ui/theme/default/metrics';

const ArrowButtonIcon = (props) => {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={9}
         height={15}
         viewBox="0 0 9 15"
         fill="none"
         {...props}
      >
         <Path
            opacity={0.3}
            d="M1.28 14.966c.323 0 .589-.116.804-.332l6.367-6.217c.282-.282.424-.573.424-.93 0-.357-.133-.655-.424-.93L2.084.333a1.158 1.158 0 00-1.967.822c0 .315.133.614.365.846l5.645 5.487-5.645 5.479a1.197 1.197 0 00-.365.847c0 .639.523 1.153 1.162 1.153z"
            fill="#3C3C43"
         />
      </Svg>
   )
}

export default ArrowButtonIcon;