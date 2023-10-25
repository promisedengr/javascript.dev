import Svg, {
  Path
} from 'react-native-svg';
import * as React from 'react';

const MailIcon = (props) => {
  return (
    <Svg width={props.w} height={props.h} viewBox="0 0 20 16" fill="none">
      <Path d="M2.8 0.799805H17.2C18.19 0.799805 19 1.6098 19 2.5998V13.3998C19 14.3898 18.19 15.1998 17.2 15.1998H2.8C1.81 15.1998 1 14.3898 1 13.3998V2.5998C1 1.6098 1.81 0.799805 2.8 0.799805Z" stroke={props.color} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M19 2.59961L10 8.89961L1 2.59961" stroke={props.color} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}

export default MailIcon;