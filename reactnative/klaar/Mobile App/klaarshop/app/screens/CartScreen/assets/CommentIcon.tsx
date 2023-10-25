import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function CommentIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={19}
      viewBox="0 0 24 19"
      fill="none"
      {...props}
    >
      <Path
        d="M0 18.33V6.587A6.595 6.595 0 016.587 0h10.825A6.596 6.596 0 0124 6.587v2.025a6.595 6.595 0 01-6.587 6.587H6.74L0 18.33zM6.587 1.47a5.124 5.124 0 00-5.119 5.118v9.442l4.948-2.299h10.997a5.124 5.124 0 005.119-5.118V6.586a5.125 5.125 0 00-5.12-5.118H6.587zm.484 5.006a1.396 1.396 0 110 2.793 1.396 1.396 0 010-2.793zm9.857 0a1.396 1.396 0 110 2.793 1.396 1.396 0 010-2.793zm-4.93 0A1.396 1.396 0 1112 9.268a1.396 1.396 0 010-2.793z"
        fill="#010002"
      />
    </Svg>
  )
}

export default CommentIcon
