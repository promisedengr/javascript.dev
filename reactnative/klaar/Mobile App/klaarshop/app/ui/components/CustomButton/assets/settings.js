import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.07 15.193a3 3 0 100-6 3 3 0 000 6z"
        stroke="#12121D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.47 15.193a1.65 1.65 0 00.33 1.82l.06.06a1.998 1.998 0 010 2.83 2.001 2.001 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51v.17a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.649 1.649 0 00-1.82.33l-.06.06a2.002 2.002 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1h-.17a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.08a1.65 1.65 0 001-1.51v-.17a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 013.417 1.415 2 2 0 01-.586 1.415l-.06.06a1.65 1.65 0 00-.33 1.82v.08a1.65 1.65 0 001.51 1h.17a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1v0z"
        stroke="#12121D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent