import Svg, {
  Path, Circle
} from 'react-native-svg';
import React from 'react';

const ProfileIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="11.25" stroke="black" strokeWidth="1.5"/>
        <Circle cx="12" cy="9" r="4.25" stroke="black" strokeWidth="1.5"/>
        <Path d="M18 21C16.967 18.6412 14.669 17 12 17C9.33098 17 7.033 18.6412 6 21" stroke="black" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default ProfileIcon;