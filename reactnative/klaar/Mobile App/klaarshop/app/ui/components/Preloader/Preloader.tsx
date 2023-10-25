import React, { memo, FC } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { createStyle } from './PreloaderStyles'
import { useThemeContext } from '~/ui/theme'
import { colors } from '~/ui/theme/default/colors';

export type PreloaderProps = {
   size?: `large` | `small`
   color?: string

};

const Preloader: FC<PreloaderProps> = (props) => {
   const { size = `large`, color = colors.mainBlue } = props
   const { s } = useThemeContext(createStyle)

   return (
      <View style={s?.preloader}>
         <ActivityIndicator size={size} color={color} />
      </View>
   );
};



const MemorizedComponent = memo(Preloader)
export { MemorizedComponent as Preloader }