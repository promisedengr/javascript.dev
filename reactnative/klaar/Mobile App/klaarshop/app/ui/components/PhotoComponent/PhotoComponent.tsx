import * as React from 'react';
import { memo, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';
import { ImageWithLoader } from '../ImageWithLoader/ImageWithLoader';
import DeleteIcon from './assets/deleteIcon';

const { width, height } = Dimensions.get('window');

export type PhotoComponentType = {
   onPress(): void,
   image: string
   onPhotoPress?: () => void
}

const PhotoComponent: React.FC<PhotoComponentType> = (props) => {

   const { onPress, image = ``, onPhotoPress } = props;

   const { s } = useThemeContext(createStyle);

   const [imageLoad, setimageLoad] = useState(false)

   const onImageLoad = () => {
      setimageLoad(true)
   }

   const onImageLoadEnd = () => {
      setimageLoad(false)
   }

   return (
      <View style={s?.container}>
         <TouchableOpacity style={[s?.iconBox, s?.deleteIcon]} onPress={onPress}>
            <DeleteIcon />
         </TouchableOpacity>
         <ImageWithLoader source={image}
            onPhotoPress={onPhotoPress}
            imageLoad={imageLoad}
            onLoadStart={onImageLoad}
            onLoadEnd={onImageLoadEnd}
            photoStyle={s?.imageStyle}
            photoContainerStyle={s?.imageStyle}
         />
      </View>
   )
}

const MPhotoComponent = memo(PhotoComponent);
export { MPhotoComponent as PhotoComponent };



const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         width: 79,
         height: 79,
         marginBottom: 9,
         borderRadius: 30,
         //backgroundColor: theme.colors.background,
         justifyContent: 'center',
         alignItems: 'center'
      },
      imageStyle: {
         width: '100%',
         height: '100%',
         borderRadius: 30,
         marginBottom:-9
      },
      iconBox: {
         alignItems: 'center',
         justifyContent: 'center',
         width: 25,
         height: 25,
         borderRadius: 12.5,
         backgroundColor: theme.colors.white,
      },
      deleteIcon: {
         position: 'absolute',
         zIndex: 1,
         top: 0,
         left: 55
      }

   });