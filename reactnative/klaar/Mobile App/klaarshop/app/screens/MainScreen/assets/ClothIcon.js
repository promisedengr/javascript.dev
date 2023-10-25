import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function ClothIcon(props) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={22}
         height={22}
         viewBox="0 0 22 22"
         fill="none"
         {...props}
      >
         <Path
            d="M18.999 11.25a.75.75 0 00-.75.75l.001 8s0 0 0 0a.25.25 0 01-.25.25H6a.25.25 0 01-.25-.25v0l-.001-8.001a.75.75 0 00-.75-.75L3 11.25s0 0 0 0a.25.25 0 01-.25-.25V4A.25.25 0 013 3.75h5c.056 0 .13.02.22.102a.92.92 0 01.236.375 3.75 3.75 0 007.088 0 .919.919 0 01.237-.375c.09-.081.163-.102.219-.102h5a.25.25 0 01.25.25v7a.25.25 0 01-.25.25h-2.001z"
            stroke={props.color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   )
}

export default ClothIcon
