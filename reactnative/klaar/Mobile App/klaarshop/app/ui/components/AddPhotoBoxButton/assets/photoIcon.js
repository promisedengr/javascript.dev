import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PhotoIcon(props) {
  return (
    <Svg {...props} width={32} height={28} viewBox="0 0 32 28" fill="none">
      <Path
        d="M16 20.222a4.667 4.667 0 100-9.333 4.667 4.667 0 000 9.333z"
        fill="#fff"
      />
      <Path
        d="M28.444 3.111h-4.93l-1.93-2.1A3.095 3.095 0 0019.298 0h-6.596c-.871 0-1.711.373-2.302 1.011l-1.913 2.1H3.555a3.12 3.12 0 00-3.11 3.111V24.89A3.12 3.12 0 003.554 28h24.89a3.12 3.12 0 003.11-3.111V6.222a3.12 3.12 0 00-3.11-3.11zM16 23.333a7.78 7.78 0 01-7.778-7.777A7.78 7.78 0 0116 7.778a7.78 7.78 0 017.778 7.778A7.78 7.78 0 0116 23.333z"
        fill="#fff"
      />

    </Svg>
  )
};

export default PhotoIcon;