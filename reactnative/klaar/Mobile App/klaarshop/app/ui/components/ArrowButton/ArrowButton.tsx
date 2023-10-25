import * as React from 'react';
import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';
import { BaseItem } from '../BaseItem/BaseItem';
import { BaseItemProps } from '../BaseItem/index';
import ArrowButtonIcon from './assets/ArrowButtonIcon';

export type ArrowButtonType = {
   title: string
   icon?: object
   onPress?: (...args: any) => void
} & BaseItemProps;

const ArrowButton: React.FC<ArrowButtonType> = props => {
   const {
      title,
      icon,
      onPress,
      children
   } = props;

   const { s } = useThemeContext(createStyle);

   return (
      <TouchableOpacity style={{ flexDirection: `row` }} onPress={onPress}>
         <View style={s?.marginLeft} />
         <BaseItem
            {...props}
            style={s?.buttonStyle}
            left={
               <Text style={s?.titleStyle}>
                  {title}
               </Text>
            }
            right={<ArrowButtonIcon />}// Icon arrow right nave to is here !
         >{children}</BaseItem>
      </TouchableOpacity>
   )
};

const MArrowButton = memo(ArrowButton);
export { MArrowButton as ArrowButton };

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      buttonStyle: {
         backgroundColor: theme.colors.white,
         width: '100%',
         height: theme.metrics.x6 * theme.metrics.x05,
      },
      marginLeft: {
         height: theme.metrics.x6 * theme.metrics.x05,
         width: theme.metrics.x4,
         backgroundColor: theme.colors.white
      },
      titleStyle: theme.fonts.h2.regular
   });