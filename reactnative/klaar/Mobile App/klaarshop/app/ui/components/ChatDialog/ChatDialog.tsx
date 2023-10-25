import React, { FC, memo } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { dateFormater } from "~/store/restHelper";
import { Theme, useThemeContext } from "~/ui/theme";
import { AvatarWithStatus } from "./AvatarWithStatus";


const { width: w } = Dimensions.get(`window`)

type Props = {
   source: string
   title: string
   time: number
   message: string
   messCounter?: string | number
   isOnline?: boolean
   onPress?: (...args: any) => void
}

const ChatDialog: FC<Props> = memo((props) => {

   const { source, title,
      time: propsTime,
      message,
      messCounter,
      isOnline = false,
      onPress } = props

   const time = propsTime ? dateFormater(`HH-MM`)(propsTime) : ``

   const messCounterValue = messCounter ? (+messCounter > 999 ? `999+` : +messCounter) : undefined

   const { s } = useThemeContext(createStyle);


   return (
      <TouchableOpacity onPress={onPress} style={s?.container}>
         <AvatarWithStatus isOnline={isOnline} source={source} />
         <View style={s?.textWrapper}>
            <View style={s?.titleTimeWrapper} >
               <View style={{ flex: 1, paddingRight: 20 }}>
                  <Text style={s?.titeText} numberOfLines={1} >
                     {title}
                  </Text>
               </View>
               <View>
                  <Text style={s?.timeText}>
                     {time}
                  </Text>
               </View>
            </View>
            <View style={s?.messAndMesAmout}>
               <View style={{ flex: 6, paddingRight: 20 }}>
                  <Text style={s?.message} numberOfLines={1} ellipsizeMode={`tail`}>
                     {message}
                  </Text>
               </View>
               {messCounterValue
                  ? <View style={{ flex: 1 }}>
                     <View style={s?.messAmoutWrapper}>
                        <Text style={s?.messAmoutText} >
                           {messCounterValue}
                        </Text>
                     </View>
                  </View>
                  : <View style={{ flex: 1 }} />
               }
            </View>
         </View>
      </TouchableOpacity>
   )
})

export { ChatDialog }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: w - 32,
         flexDirection: `row`,
         backgroundColor: "rgba(0,0,0,0)",
      },
      avatarWrapper: {
         width: 56,
         height: 56,
         borderRadius: 20,
      },
      textWrapper: {
         justifyContent: `center`,
         paddingLeft: theme.metrics.x2,
         flex: 1
      },
      titeText: {
         fontSize: 17,
         fontWeight: `600`
      },
      message: {
         fontSize: 15,
         color: theme.colors.silver,
      },
      titleTimeWrapper: {
         flexDirection: `row`
      },
      messAndMesAmout: {
         flexDirection: `row`
      },
      messAmoutWrapper: {
         backgroundColor: theme.colors.lightBlue2,
         paddingHorizontal: theme.metrics.x,
         borderRadius: 10,
         position: `absolute`,
         alignSelf: `flex-end`
      },
      messAmoutText: {
         color: theme.colors.white,
         fontWeight: `500`
      },
      absolute: {
         position: `absolute`,
         left: 0,
         right: 0,
         top: 0,
         bottom: 0,
         borderRadius: 20
      },
      timeText: {
         color: theme.colors.silver,
         fontWeight: `500`
      },
      onlineStatus: {
         backgroundColor: theme.colors.lightBlue2,
         alignSelf: `flex-end`,
         width: 14,
         height: 14,
         borderRadius: 7,
         borderWidth: 1,
         borderColor: theme.colors.lightGray3
      }
   })