import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const FacebookIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 24 24" fill="none">
        <Path d="M22.6754 24C23.4068 24 24 23.4069 24 22.6754V1.32459C24 0.592966 23.4068 0 22.6754 0H1.32459C0.592875 0 0 0.592966 0 1.32459V22.6754C0 23.4069 0.592875 24 1.32459 24H22.6754Z" fill="#395185"/>
        <Path d="M16.8992 24.0002V14.5456H20.1156L20.5972 10.8609H16.8992V8.50836C16.8992 7.44156 17.1995 6.71456 18.75 6.71456L20.7275 6.7137V3.4182C20.3853 3.37328 19.2115 3.27295 17.846 3.27295C14.9948 3.27295 13.043 4.99008 13.043 8.14358V10.8609H9.81836V14.5456H13.043V24.0002H16.8992Z" fill="white"/>
      </Svg>

    );
}

export default FacebookIcon;