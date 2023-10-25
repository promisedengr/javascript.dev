import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const SellIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 24 24" fill="none">
        <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M12 8V16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M8 12H16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
}

export default SellIcon;