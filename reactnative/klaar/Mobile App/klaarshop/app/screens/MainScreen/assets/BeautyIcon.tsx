import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function BeautyIcon(props: SvgProps) {
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
        d="M12 2.24c4.04 0 7.32 4.374 7.32 9.76 0 5.395-3.28 9.76-7.32 9.76-4.039 0-7.32-4.365-7.32-9.76 0-5.386 3.281-9.76 7.32-9.76zm0 1.774C8.908 4.014 6.402 7.59 6.402 12S8.908 19.986 12 19.986 17.598 16.41 17.598 12 15.092 4.014 12 4.014zm-2.753 6.915a.655.655 0 010-.912l1.878-1.941a.655.655 0 11.942.91l-1.879 1.942a.655.655 0 01-.94.001zm.354 3.843a.655.655 0 010-.912l3.966-4.086a.652.652 0 01.936.908l-3.962 4.09a.655.655 0 01-.94 0z"
        fill="#000"
      />
    </Svg>
  )
}

export default BeautyIcon
