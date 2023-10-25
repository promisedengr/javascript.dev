import * as React from 'react';
import Svg, {
   Path
} from 'react-native-svg';
import { colors } from '~/ui/theme/default/colors';

const CheckCircleIcon = (props) => {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={props.w}
         height={props.h}
         viewBox="0 0 15 13"
         fill="none"
         {...props}
      >
         <Path
            d="M14 1L4 11.01l-3-3"
            stroke="#3CB8FF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   );
}

export default CheckCircleIcon;