import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const UsersIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 20 16" fill="none">
        <Path d="M13.6061 14.6193V13.106C13.6061 12.3033 13.274 11.5335 12.683 10.9659C12.092 10.3983 11.2904 10.0795 10.4545 10.0795H4.15151C3.31568 10.0795 2.51408 10.3983 1.92306 10.9659C1.33203 11.5335 1 12.3033 1 13.106V14.6193" stroke="#FAFBFF" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M7.30288 7.05299C9.04341 7.05299 10.4544 5.69798 10.4544 4.0265C10.4544 2.35501 9.04341 1 7.30288 1C5.56235 1 4.15137 2.35501 4.15137 4.0265C4.15137 5.69798 5.56235 7.05299 7.30288 7.05299Z" stroke="#FAFBFF" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M18.3334 14.6195V13.1063C18.3328 12.4357 18.1004 11.7843 17.6726 11.2543C17.2448 10.7243 16.6458 10.3457 15.9697 10.1781" stroke="#FAFBFF" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M12.8184 1.09839C13.4963 1.26507 14.0971 1.64368 14.5262 2.17452C14.9553 2.70536 15.1882 3.35825 15.1882 4.03025C15.1882 4.70224 14.9553 5.35513 14.5262 5.88597C14.0971 6.41682 13.4963 6.79542 12.8184 6.9621" stroke="#FAFBFF" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default UsersIcon;