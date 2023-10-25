import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const Star = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 14 14" fill="none">
        <Path d="M7.00016 0.333008L9.06016 4.50634L13.6668 5.17968L10.3335 8.42634L11.1202 13.013L7.00016 10.8463L2.88016 13.013L3.66683 8.42634L0.333496 5.17968L4.94016 4.50634L7.00016 0.333008Z" fill="#FF8500"/>
      </Svg>
    );
}

export default Star;