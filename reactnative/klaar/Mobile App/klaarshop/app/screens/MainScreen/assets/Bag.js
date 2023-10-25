import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.773 8.305V5.273A3.772 3.772 0 0010 1.5a3.773 3.773 0 00-3.79 3.756v3.049"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M14.742 20H5.258A4.256 4.256 0 011 15.747V10.23a4.256 4.256 0 014.258-4.255h9.484A4.256 4.256 0 0119 10.23v5.516A4.256 4.256 0 0114.742 20z"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
