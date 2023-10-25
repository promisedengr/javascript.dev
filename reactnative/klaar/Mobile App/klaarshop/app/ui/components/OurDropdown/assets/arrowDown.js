import Svg, {
   Path
} from 'react-native-svg';
import React from 'react';

const ArrowDownIcon = (props) => {

   const { w =13, h =13, stroke = "#979CA0" } = props
   return (
      <Svg width={w} height={h} viewBox="0 0 12 7" fill="none">
         <Path d="M11 1L6 6L1 1" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </Svg>
   );
}

export default ArrowDownIcon;