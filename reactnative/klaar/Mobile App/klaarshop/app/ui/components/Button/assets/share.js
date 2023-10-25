import Svg, {
  Path
} from 'react-native-svg';
import React from 'react';

const ShareIcon = (props) => {
    return (
      <Svg width={props.w} height={props.h} viewBox="0 0 22 22" fill="none">
        <Path d="M3.66675 11V18.3333C3.66675 18.8196 3.8599 19.2859 4.20372 19.6297C4.54754 19.9735 5.01385 20.1667 5.50008 20.1667H16.5001C16.9863 20.1667 17.4526 19.9735 17.7964 19.6297C18.1403 19.2859 18.3334 18.8196 18.3334 18.3333V11" stroke="black" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M14.6666 5.49967L10.9999 1.83301L7.33325 5.49967" stroke="black" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M11 1.83301V13.7497" stroke="black" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </Svg>
    );
}

export default ShareIcon;