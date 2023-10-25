import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SortBtn(props: SvgProps) {
  return (
    <Svg
      {...props}
      width={24}
      height={23}
      viewBox="0 0 24 23"
      fill="none"      
    >
      <Path
        d="M4.73 4.77l2.805-2.805 2.804 2.805M7.534 21.034V1.966M18.27 18.23l-2.805 2.805-2.804-2.805M15.466 1.966v19.068"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export { SortBtn }