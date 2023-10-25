import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { theme } from "~/ui/theme/default/theme"

function DeleteIcon(props) {
  return (
    <Svg {...props} width={18} height={18} viewBox="0 0 14 14" fill="none">
      <Path
        d="M1.75 3.5h10.5M4.667 3.5V2.333a1.167 1.167 0 011.166-1.167h2.334a1.167 1.167 0 011.166 1.167V3.5m1.75 0v8.166a1.167 1.167 0 01-1.166 1.167H4.083a1.167 1.167 0 01-1.166-1.167V3.5h8.166z"
        stroke={theme.colors.black}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DeleteIcon