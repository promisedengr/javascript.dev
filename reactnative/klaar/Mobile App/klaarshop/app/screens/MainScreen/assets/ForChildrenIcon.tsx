import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function ForChildrenIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M3 6.62h2.979l1.823 7.832M7.146 10.877h12.73l-.93 3.678M7.93 19.844a2.696 2.696 0 100-5.392 2.696 2.696 0 000 5.392z"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.304 19.844a2.696 2.696 0 100-5.392 2.696 2.696 0 000 5.392zM10.451 16.189h5.336M12.578 10.755V4.13s7.297-.238 7.297 6.747"
        stroke="#000"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ForChildrenIcon
