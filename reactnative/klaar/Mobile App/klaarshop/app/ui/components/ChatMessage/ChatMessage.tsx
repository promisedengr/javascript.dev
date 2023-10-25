import React, { FC, memo } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useThemeContext, Theme } from '~/ui/theme';

type Props = {
   source: string
   message: string
   type?: boolean
}

const { width: w } = Dimensions.get(`window`)

const ChatMessage: FC<Props> = memo((props) => {

   const { source, message, type = false } = props
   const { s } = useThemeContext(createStyle);
   //console.log(message)
   return (
      <View style={[s?.container, (!type ? { flexDirection: `row-reverse`, alignSelf: `flex-end` } : {})]}>
         <FastImage style={s?.avatar} source={{ uri: source }} />
         <View style={[s?.messageWrapper, (!type ? s?.messageWrapper2 : {})]}>
            <Text style={[s?.messageText, (!type ? s?.messageText2 : s?.messageText3)]}>
               {message}
            </Text>
         </View>
      </View>
   )
})

export { ChatMessage }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: w * .57,
         flexDirection: `row`,
         alignItems: `flex-end`,
      },
      avatar: {
         width: 48,
         height: 48,
         borderRadius: 15,
      },
      messageWrapper: {
         padding: 10,
         backgroundColor: theme.colors.lightGray2,
         borderRadius: 20,
         borderBottomLeftRadius: 10,
         marginLeft: theme.metrics.x4,
      },
      messageText: {
         fontSize: 15,
         fontWeight: "400"
      },
      messageText2: {
         color: theme.colors.white
      },
      messageText3: {
         color: theme.colors.black
      },
      messageWrapper2: {
         marginLeft: 0,
         marginRight: theme.metrics.x4,
         backgroundColor: theme.colors.lightBlue2,
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 10,
      }
   })

