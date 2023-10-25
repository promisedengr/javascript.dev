
import React from "react"
import Svg, { Path } from "react-native-svg"

function MicIcon(props: any) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={24}
         height={24}
         viewBox="0 0 24 24"
         fill="none"
         {...props}
      >
         <Path
            d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3v0z"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <Path
            d="M19 10v2a7 7 0 11-14 0v-2M12 19v4"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   )
}

export default MicIcon
