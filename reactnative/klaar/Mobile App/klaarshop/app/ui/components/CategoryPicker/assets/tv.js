import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const TvIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 24 24" fill="none">
        <Path d="M20 3H4C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V5C22 3.89543 21.1046 3 20 3Z" stroke="#091B4D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M8 21H16" stroke="#091B4D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M12 17V21" stroke="#091B4D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default TvIcon;