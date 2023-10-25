import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const UsersIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 12 12" fill="none">
        <Path d="M8.5 9.5V8.5C8.5 7.96957 8.28929 7.46086 7.91421 7.08579C7.53914 6.71071 7.03043 6.5 6.5 6.5H2.5C1.96957 6.5 1.46086 6.71071 1.08579 7.08579C0.710714 7.46086 0.5 7.96957 0.5 8.5V9.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M4.5 4.5C5.60457 4.5 6.5 3.60457 6.5 2.5C6.5 1.39543 5.60457 0.5 4.5 0.5C3.39543 0.5 2.5 1.39543 2.5 2.5C2.5 3.60457 3.39543 4.5 4.5 4.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M11.5 9.50043V8.50043C11.4997 8.05729 11.3522 7.62682 11.0807 7.27659C10.8092 6.92636 10.4291 6.67621 10 6.56543" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M8 0.56543C8.43021 0.67558 8.81152 0.92578 9.08382 1.27658C9.35612 1.62739 9.50392 2.05884 9.50392 2.50293C9.50392 2.94701 9.35612 3.37847 9.08382 3.72927C8.81152 4.08008 8.43021 4.33028 8 4.44043" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default UsersIcon;