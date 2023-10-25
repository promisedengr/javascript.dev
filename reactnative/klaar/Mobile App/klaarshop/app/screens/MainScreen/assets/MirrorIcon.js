import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 .24c4.04 0 7.32 4.375 7.32 9.76 0 5.396-3.28 9.762-7.32 9.762C3.961 19.762.68 15.396.68 10 .68 4.615 3.96.24 8 .24zm0 1.775C4.908 2.015 2.402 5.59 2.402 10S4.908 17.987 8 17.987 13.598 14.41 13.598 10 11.092 2.015 8 2.015zM5.247 8.93a.655.655 0 010-.912l1.878-1.941a.655.655 0 01.942.91L6.188 8.93a.655.655 0 01-.94 0zm.354 3.843a.655.655 0 010-.912l3.966-4.086a.652.652 0 01.936.908l-3.962 4.09a.655.655 0 01-.94 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SvgComponent
