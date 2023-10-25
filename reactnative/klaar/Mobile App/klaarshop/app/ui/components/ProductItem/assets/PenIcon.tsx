import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function PenIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <Path
        d="M10.834 1.543a1.854 1.854 0 112.623 2.623l-8.851 8.85L1 14l.983-3.606 8.851-8.85z"
        fill="#3CB8FF"
        fillOpacity={0.3}
        stroke="#3CB8FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PenIcon
