import React, { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useThemeContext, Theme } from '~/ui/theme'
import SendMessageIcon from './assets/SendMessageIcon'

type Props = {
   value: string
   onChangeText: (value: string) => void
   onSendMessage: (value: string) => void
   onBlur?: () => void
   onFocus?: () => void
   focus?: boolean
}

const { width: w } = Dimensions.get(`window`)

const MessageInput: FC<Props> = (props) => {

   const { value, onChangeText, onSendMessage, onFocus, onBlur, focus = false } = props
   const input = useRef<TextInput>(null)

   if (focus) {
      input.current?.focus()
   }

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation()

   return (
      <KeyboardAvoidingView style={s?.container} behavior={'padding'} enabled={Platform.OS === 'ios'} keyboardVerticalOffset={90}>
         {/* <TouchableOpacity style={s?.attachFile}><AttachFiles /></TouchableOpacity> */}
         <TextInput
            ref={input}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={`${t(`buttons.message`)}...`}
            style={s?.input}
            value={value}
            onChangeText={onChangeText}
         />
         {value.length !== 0 ?
            <TouchableOpacity style={s?.sendMessage} onPress={() => onSendMessage(value)}>
               <View style={s?.sendMessageIcon}>
                  <SendMessageIcon />
               </View>
            </TouchableOpacity>
            : null}
      </KeyboardAvoidingView>
   )
}



export { MessageInput }



const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: w,
         borderTopWidth: 1,
         borderTopColor: theme.colors.gray,
         flexDirection: `row`,
         backgroundColor: theme.colors.white
      },
      sendMessageIcon: {
         justifyContent: "flex-end",
         alignItems: `center`,
         width: 40,
         height: 40,
         borderRadius: 20,
         backgroundColor: theme.colors.lightBlue2
      },
      sendMessage: {
         justifyContent: `center`,
         alignItems: `center`,
         position: 'absolute',
         right: theme.metrics.x5,
         top: theme.metrics.x4
      },
      input: {
         flex: 4,
         paddingLeft: theme.metrics.x4,
         paddingVertical: theme.metrics.x3
      }
   })