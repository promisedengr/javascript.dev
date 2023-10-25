import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(active) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24.002 4.004c-11.044 0-19.998 8.954-19.998 19.998 0 9.98 7.312 18.252 16.874 19.758V29.784h-5.08v-5.782h5.08v-4.406c0-5.016 2.986-7.782 7.552-7.782 2.188 0 4.48.39 4.48.39v4.918h-2.528c-2.48 0-3.256 1.544-3.256 3.126v3.75h5.542l-.886 5.782h-4.656v13.976C36.688 42.258 44 33.984 44 24.002c0-11.044-8.954-19.998-19.998-19.998z"
        fill={active === true? "#395185": "#c0c0c0"}
      />
    </Svg>
  )
}

export default SvgComponent