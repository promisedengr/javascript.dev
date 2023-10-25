import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Truck(props) {
  return (
    <Svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 3H1v13h15V3zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Truck