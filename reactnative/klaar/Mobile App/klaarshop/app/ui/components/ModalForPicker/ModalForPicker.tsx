import React, { memo, FC } from 'react'
import { Dimensions, Modal, TouchableOpacity, View } from 'react-native'
import { useThemeContext } from '~/ui/theme'
import { StyleSheet } from 'react-native'
import { Theme } from '~/ui/theme'
import { Text } from 'react-native'
import { BlurView } from '@react-native-community/blur'

export type ModalForPickerProps = {
   valueArr: { value: string, label: string }[]
   changeFunc: (...args: any) => void
   setModalVisible: (bool: boolean) => void
   visible: boolean
};

export type PickerValueT<T = string> = {
   value: T
   label: string
}

const { width: w } = Dimensions.get(`screen`)

const ModalForPicker: FC<ModalForPickerProps> = (props) => {
   const { valueArr, visible, setModalVisible, changeFunc } = props
   const { s } = useThemeContext(createStyle)


   const onPress = (value: { value: string, label: string }) => {
      changeFunc(value)
      setModalVisible(!visible)
   }

   return (<Modal
      animationType={`fade`}
      transparent={true}
      visible={visible}
   >
      <View style={s?.modal}>

         <BlurView
            style={s?.absolute}
            blurType='dark'
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
         />
         <View style={s?.modalWrapper}>
            {
               valueArr.map((d, idx, arr) => {
                  if (!d.value) return null
                  return (
                     <TouchableOpacity
                        key={d.label}
                        onPress={() => onPress(d)}
                        style={[s?.modalItem]}
                     >
                        <Text style={s?.modalText}>{d.label}</Text>
                     </TouchableOpacity>
                  )
               })
            }
         </View>
      </View>
   </Modal>
   )
}



const MemorizedComponent = memo(ModalForPicker)
export { MemorizedComponent as ModalForPicker }


export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      modal: {
         flex: 1,
         justifyContent: `center`,
         alignItems: `center`
      },
      modalItem: {
         width: w * 0.8,
         backgroundColor: `white`,
         justifyContent: `center`,
         padding: theme.metrics.x5
      },

      modalText: {
         fontSize: 20,
         fontWeight: "800"
      },
      modalWrapper: {
         backgroundColor: theme.colors.white
      },
      absolute: {
         position: "absolute",
         top: 0,
         left: 0,
         bottom: 0,
         right: 0
      },
   })