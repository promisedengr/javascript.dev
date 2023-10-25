import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.85 1.25v2.42M12.85 14.76v2.024M12.85 11.325V6.504"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M17.702 17C19.524 17 21 15.543 21 13.743v-2.592A2.159 2.159 0 0118.823 9c0-1.19.971-2.15 2.177-2.15l-.001-2.594c0-1.8-1.477-3.257-3.298-3.257H4.3C2.478 1 1 2.457 1 4.257L1 6.935c1.206 0 2.177.875 2.177 2.066 0 1.19-.971 2.15-2.177 2.15v2.592C1 15.543 2.476 17 4.298 17h13.404z"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
