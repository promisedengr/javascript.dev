import * as React from "react"
import { Text, View } from "react-native"
import Svg, { SvgProps, Path, Rect, } from "react-native-svg"
import { StyleSheet } from 'react-native'
import { Theme, useThemeContext } from '~/ui/theme'


function RingIcon(props: SvgProps & { amount?: number, onPress: () => void }) {

   const { amount = 0, onPress } = props
   const num = amount > 10 ? `+9` : amount
   const { s } = useThemeContext(createStyle);

   return (<Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
   >
      <Path
         d="M19.5 8.666a6.5 6.5 0 10-13 0c0 7.584-3.25 9.75-3.25 9.75h19.5s-3.25-2.166-3.25-9.75z"
         fill="#3CB8FF"
         fillOpacity={0.3}
         stroke="#3CB8FF"
         strokeWidth={1.5}
         strokeLinecap="round"
         strokeLinejoin="round"
      />
      <Path
         d="M14.874 22.75a2.167 2.167 0 01-3.748 0"
         stroke="#3CB8FF"
         strokeWidth={1.5}
         strokeLinecap="round"
         strokeLinejoin="round"
      />
      <View style={s?.counter}>
         <Text style={s?.counterText}>{num}</Text>
      </View>
   </Svg>
   )
}


export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      counter: {
         alignItems: `center`,
         justifyContent: `center`,
         borderRadius: 100,
         backgroundColor: theme.colors.mainBlue,
         alignSelf: `flex-end`,
         width: 13,
         height: 13
      },
      counterText: {
         color: `#fff`,
         fontSize: 10,
         fontWeight: "500"
      }

   })

export default RingIcon
