import React from "react"
import { Path, Svg } from "react-native-svg"

function AttachFiles(props:any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none"
      {...props}
    >
      <Path
        d="M20.44 11.05l-9.19 9.19a6.003 6.003 0 11-8.49-8.49l9.19-9.19a4.002 4.002 0 015.66 5.66l-9.2 9.19a2.001 2.001 0 11-2.83-2.83l8.49-8.48"
        stroke="#22325F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AttachFiles
