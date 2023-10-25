import React from "react"
import Svg, { Path } from "react-native-svg"

function PopularIcon({ isActive, ...restProps }: { isActive?: boolean }) {
   return (
      <Svg
         width={19}
         height={24}
         viewBox="0 0 19 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...restProps}
      >
         <Path
            d="M17.397 11.166h0a8.57 8.57 0 00-2.045-2.842h0l-.182-.167-.08.232v.001c-.259.744-.72 1.47-1.334 2.154l-.01.01a.917.917 0 01-.59.29.908.908 0 01-.986-.958v-.004c.088-1.433-.338-3.115-1.354-5.02v-.001C10.003 3.33 8.883 2.15 7.49 1.328c0 0 0 0 0 0l-.255-.15.014.3h0c.043.954-.065 1.838-.35 2.602a8.4 8.4 0 01-1.384 2.4h0c-.413.502-.88.956-1.395 1.353l-.001.002a8.708 8.708 0 00-2.477 2.999 8.578 8.578 0 00-.892 3.804l16.647-3.472zm0 0c.491 1.103.738 2.27.738 3.475v.001a8.483 8.483 0 01-.683 3.352h0a8.536 8.536 0 01-1.863 2.736l-.002.002a8.603 8.603 0 01-2.76 1.843h-.001a8.736 8.736 0 01-3.384.675 8.689 8.689 0 01-3.382-.677h-.001m11.338-11.407L6.06 22.573m0 0a8.676 8.676 0 01-4.626-4.582l4.626 4.582zm-4.626-4.582A8.483 8.483 0 01.75 14.64l.683 3.352z"
            fill={isActive ? "#C5EAFF" : ""}
            stroke={isActive ? "#3CB8FF" : "#000"}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   )
}

export default PopularIcon