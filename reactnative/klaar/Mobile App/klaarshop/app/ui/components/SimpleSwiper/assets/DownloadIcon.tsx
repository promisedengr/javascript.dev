import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function DownloadIcon(props: SvgProps) {
  return (
    <Svg
      {...props}
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"      
    >
      <Path
        d="M3 9v6a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0015 15V9M12 4.5l-3-3-3 3M9 1.5v9.75"
        stroke="#979CA0"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DownloadIcon