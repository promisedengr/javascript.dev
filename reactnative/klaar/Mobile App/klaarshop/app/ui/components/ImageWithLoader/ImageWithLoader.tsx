import React, { memo, FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { Theme } from '~/ui/theme'
import { useThemeContext } from '~/ui/theme'
import { Preloader } from '../Preloader/Preloader'

export type ImageWithLoaderProps = {
   imageLoad: boolean
   onLoadStart: () => void
   onLoadEnd: () => void
   onPhotoPress?: () => void
   photoContainerStyle?: StyleProp<ViewStyle>
   photoStyle?: StyleProp<ImageStyle>
   source?: string
   loaderSize?: `large` | `small`
};

const ImageWithLoader: FC<ImageWithLoaderProps> = ({ photoStyle = {}, photoContainerStyle = {}, imageLoad,
   onLoadStart, onLoadEnd, onPhotoPress, source,
   loaderSize = `large` }) => {

   const { s } = useThemeContext(createStyle)

   return (
      <TouchableOpacity style={[s?.imageStyle, photoContainerStyle]} onPress={onPhotoPress}>
         <FastImage style={[s?.imageStyle, photoStyle]} onLoad={onLoadStart} onLoadEnd={onLoadEnd}
            source={{ uri: source }} >
            {imageLoad ? <Preloader size={loaderSize} /> : null}
         </FastImage>
      </TouchableOpacity>
   )
}

const MemorizedComponent = memo(ImageWithLoader)
export { MemorizedComponent as ImageWithLoader }

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      imageStyle: {
         width: '100%',
         height: '100%',
         backgroundColor: theme.colors.white
      },
   })