import React from 'react'
import Svg,{ G, Defs, ClipPath, Path } from 'react-native-svg'


function SendMessageIcon(props:any) {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        {...props}
      >
        <G
          clipPath="url(#prefix__clip0)"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M16.264 2.121v15.557M16.263 2.122l9.193 19.091-9.193-3.535-9.192 3.535 9.192-19.091z" />
        </G>
        <Defs>
          <ClipPath id="prefix__clip0">
            <Path
              fill="#fff"
              transform="rotate(-45 20.485 8.485)"
              d="M0 0h24v24H0z"
            />
          </ClipPath>
        </Defs>
      </Svg>
    )
  }
  
  export default SendMessageIcon