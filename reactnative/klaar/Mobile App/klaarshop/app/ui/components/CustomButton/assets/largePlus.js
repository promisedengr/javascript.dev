import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={77} height={73} viewBox="0 0 77 73" fill="none">
      <Path fill={props.color} d="M36.962.167h1.906v72.222h-1.906z" />
      <Path fill={props.color} d="M.753 38.083v-1.806h76.23v1.806z" />
    </Svg>
  )
}

export default SvgComponent