import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function CloseIcon(props) {


   const { w = 32, h = 32, fill = `none`, stroke = `#3CB8FF` } = props

   return (
      <Svg width={w} height={h} viewBox="0 0 32 32" fill={fill}>
         <Circle cx={16} cy={16} r={15} stroke={stroke} strokeWidth={2} />
         <Path
            d="M9 23L23 9M9 9l14 14"
            stroke={stroke}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   )
}

export default CloseIcon