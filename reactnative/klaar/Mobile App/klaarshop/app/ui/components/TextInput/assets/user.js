import Svg, {
  Circle, Rect
} from 'react-native-svg';
import * as React from 'react';

const UserIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 17 19" fill="none">
        <Rect x="1.53125" y="12.625" width="13.9375" height="5.625" rx="2.8125" stroke={props.color} strokeWidth="1.5"/>
        <Circle cx="8.5" cy="5.34375" r="4.59375" stroke={props.color} strokeWidth="1.5"/>
      </Svg>
    );
}

export default UserIcon;