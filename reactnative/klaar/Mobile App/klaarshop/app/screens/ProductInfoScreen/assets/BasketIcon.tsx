import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import Svg, { SvgProps, Path } from "react-native-svg"
import { Theme, useThemeContext } from "~/ui/theme"
import { colors } from "~/ui/theme/default/colors"
import { metrics } from "~/ui/theme/default/metrics"

type PropsType = {
   basketCount?: number,
   svgProps?: SvgProps
}


const BasketIcon: React.FC<PropsType> = ({
   basketCount,
   svgProps
}) => {

   const { s } = useThemeContext(createStyle);

   return (
      <View style={{ paddingBottom: metrics.x2 }}>
         {basketCount !== 0 &&
            <View style={s?.counter}>
               <Text style={s?.text}>
                  {basketCount}
               </Text>
            </View>
         }
         <Svg
            {...svgProps}
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"

         >
            <Path
               d="M9 22.822c.552 0 1-.465 1-1.038 0-.572-.448-1.037-1-1.037s-1 .465-1 1.037c0 .573.448 1.038 1 1.038zM20 22.822c.552 0 1-.465 1-1.038 0-.572-.448-1.037-1-1.037s-1 .465-1 1.037c0 .573.448 1.038 1 1.038z"
               fill="#000"
               stroke="#000"
               strokeWidth={1.5}
               strokeLinecap="round"
               strokeLinejoin="round"
            />
            <Path
               d="M1 1.038h4l2.68 13.89c.091.477.342.906.708 1.212.365.305.823.467 1.292.458h9.72c.47.01.927-.153 1.293-.458.365-.306.616-.735.707-1.212L23 6.224H6"
               stroke="#000"
               strokeWidth={1.5}
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </Svg>
      </View>
   )
}

export { BasketIcon }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      counter: {
         borderRadius: 100,
         backgroundColor: colors.mainBlue,
         position: 'relative',
         zIndex: 1,
         top: theme.metrics.x3,
         left: theme.metrics.x3
      },
      text: {
         fontSize: theme.metrics.x3,
         color: theme.colors.white,
         textAlign: 'center',
         lineHeight: theme.metrics.x4
      }
   })

