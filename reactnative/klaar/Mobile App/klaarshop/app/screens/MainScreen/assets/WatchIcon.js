import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

function WatchIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0)"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.722 18.619A7 7 0 1014.278 5.38a7 7 0 00-4.556 13.238z" />
        <Path d="M12.977 9.163L12 12l.93 1.906M14.523 18.526l-1.577 3.507a2 2 0 01-2.483 1.07l-4.095-1.409a2 2 0 01-1.299-2.372l.916-3.735M9.476 5.473l1.578-3.508A2 2 0 0113.528.892l4.113 1.415A2 2 0 0118.94 4.68l-.916 3.736" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default WatchIcon
