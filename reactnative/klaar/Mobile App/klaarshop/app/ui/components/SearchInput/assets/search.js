import Svg, {
   Path
} from 'react-native-svg';
import React from 'react';

const SearchIcon = (props) => {   
   
   const { isActive, isNav = false } = props
   return (
      <Svg width={props.w} height={props.h} viewBox="0 0 16 16" fill={isNav ? (isActive ? "#C5EAFF" : "none") : `none`}>
         <Path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke={isNav ? (isActive ? "#3CB8FF" : "black") : `#979CA0`} stroke-linecap="round" stroke-linejoin="round" />
         <Path d="M13.9996 14.0001L11.0996 11.1001" stroke={isNav ? (isActive ? "#3CB8FF" : "black") : `#979CA0`} stroke-linecap="round" stroke-linejoin="round" />
      </Svg>
   );
}

export default SearchIcon;