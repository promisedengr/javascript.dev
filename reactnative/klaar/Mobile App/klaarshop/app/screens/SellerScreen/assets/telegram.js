import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(active) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24 4C12.951 4 4 12.952 4 24s8.952 20 20 20c11.049 0 20-8.952 20-20S35.048 4 24 4zm9.823 13.702L30.541 33.17c-.243 1.097-.896 1.363-1.807.847l-5-3.685-2.411 2.322c-.266.266-.492.492-1.008.492l.355-5.09 9.265-8.37c.404-.356-.088-.557-.621-.202l-11.452 7.209-4.935-1.54c-1.073-.339-1.097-1.073.225-1.59l19.283-7.435c.895-.323 1.677.218 1.387 1.573h.001z"
        fill={active === true? "#1E96C8": "#c0c0c0"}
      />
    </Svg>
  )
}

export default SvgComponent