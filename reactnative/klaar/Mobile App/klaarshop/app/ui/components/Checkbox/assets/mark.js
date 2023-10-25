import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const MarkIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 8 6" fill="none">
        <Path d="M7 1L2.875 5L1 3.18182" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default MarkIcon;