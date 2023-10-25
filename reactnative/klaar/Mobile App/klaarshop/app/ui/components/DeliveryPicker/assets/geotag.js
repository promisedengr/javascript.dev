import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GeoTag(props) {
  return (
    <Svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 13a3 3 0 100-6 3 3 0 000 6z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default GeoTag