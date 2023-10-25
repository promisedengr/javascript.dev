import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function ClearIcon(props: SvgProps) {
   
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M8 .5C3.864.5.5 3.865.5 8c0 4.136 3.365 7.5 7.5 7.5 4.136 0 7.5-3.364 7.5-7.5S12.136.5 8 .5zm3.155 9.595l-1.06 1.06L8 9.06l-2.095 2.095-1.06-1.06L6.94 8 4.845 5.905l1.06-1.06L8 6.94l2.095-2.095 1.06 1.06L9.06 8l2.095 2.095z"
        fill="#979CA0"
      />
    </Svg>
  )
}

export default ClearIcon