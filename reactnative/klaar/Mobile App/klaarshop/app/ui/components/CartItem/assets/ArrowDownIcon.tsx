import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function ArrowDownIcon(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={8}
      viewBox="0 0 14 8"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.98 1.488L7.075 7.073a.661.661 0 01-.9 0L.27 1.488a.84.84 0 010-1.233.96.96 0 011.303 0l5.052 4.778L11.677.255a.961.961 0 011.303 0 .84.84 0 010 1.233z"
        fill="#3CB8FF"
      />
    </Svg>
  )
}

export default ArrowDownIcon
