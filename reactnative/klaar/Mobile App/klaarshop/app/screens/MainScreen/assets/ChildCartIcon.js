import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 3.621h2.979l1.823 7.832M5.146 7.877h12.73l-.93 3.678"
        stroke={props.color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.93 16.845a2.696 2.696 0 100-5.392 2.696 2.696 0 000 5.392zM16.304 16.845a2.696 2.696 0 100-5.392 2.696 2.696 0 000 5.392zM8.451 13.188h5.336M10.578 7.755V1.13s7.297-.238 7.297 6.747"
        stroke={props.color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
