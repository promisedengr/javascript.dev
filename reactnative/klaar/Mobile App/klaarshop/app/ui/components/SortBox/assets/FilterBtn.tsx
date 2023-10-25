import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function FilterBtn(props: SvgProps) {
  return (
    <Svg
      {...props}
      width={22}
      height={20}
      viewBox="0 0 22 20"
      fill="none"      
    >
      <Path
        d="M21 1H1l8 9.46V17l4 2v-8.54L21 1z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export { FilterBtn }