import * as React from "react"
import Svg, { Rect } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Rect
        x={0.75}
        y={0.75}
        width={20.5}
        height={20.5}
        rx={10.25}
        fill="#fff"
        stroke="#000"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default SvgComponent