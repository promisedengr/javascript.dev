import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const EmptyStar = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 16 15" fill="none">
        <Path d="M8.00016 1.33301L10.0602 5.50634L14.6668 6.17967L11.3335 9.42634L12.1202 14.013L8.00016 11.8463L3.88016 14.013L4.66683 9.42634L1.3335 6.17967L5.94016 5.50634L8.00016 1.33301Z" stroke="#979CA0" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default EmptyStar;