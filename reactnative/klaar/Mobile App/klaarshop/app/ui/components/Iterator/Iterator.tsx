import React, { FC, useCallback, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Theme, useThemeContext } from "~/ui/theme"



type Props = {
   iterator: number
   changeIterator: (bool: boolean, amount: number) => void
   disabled: boolean
}

const Iterator: FC<Props> = (props) => {

   const { iterator, changeIterator, disabled } = props


   const { s } = useThemeContext(createStyle);

   const onIteratorPress = useCallback((bool: boolean, disabled: boolean, iterator: number) => {
      if (!disabled) {
         changeIterator(bool, iterator)
      }
   }, [],
   )



   return (
      <View style={[s?.container, s?.center]}>
         <TouchableOpacity onPress={() => onIteratorPress(false, disabled, iterator)} style={s?.button}>
            <View style={s?.minus} />
         </TouchableOpacity>
         <View><Text style={s?.numberText}>{iterator}</Text></View>
         <TouchableOpacity onPress={() => onIteratorPress(true, disabled, iterator)} style={[s?.button, s?.buttonPlus]}>
            <View style={s?.minus} />
            <View style={s?.plus} />
         </TouchableOpacity>
      </View>
   )
}


export { Iterator }

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      center: {
         justifyContent: `center`, alignItems: `center`
      },
      container: {
         flexDirection: `row`
      },
      minus: {
         borderBottomWidth: 2,
         width: theme.metrics.x4,
         position: `absolute`
      },
      plus: {
         borderLeftWidth: 2,
         height: 16,
         position: `absolute`
      },
      button: {
         borderRadius: 16,
         width: 32,
         height: 32,
         borderWidth: 1,
         justifyContent: `center`,
         alignItems: `center`
      },
      buttonPlus: {
         backgroundColor: theme.colors.paleBlue,
         borderWidth: 0
      },
      numberText: {
         color: theme.colors.black,
         fontWeight: "400",
         fontSize: 24,
         marginHorizontal: theme.metrics.x6
      }
   })