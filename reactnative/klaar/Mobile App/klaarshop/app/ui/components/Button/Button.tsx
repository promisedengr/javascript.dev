import * as React from 'react';
import { Component } from 'react';
import {
   ActivityIndicator, StyleProp, Text,
   TouchableOpacity, View, ViewStyle
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './ButtonStyles';
import { colors } from './../../theme/default/colors';
import { theme } from '~/ui/theme/default/theme';

export type ButtonProps = {
   title?: string | object;
   spinner?: boolean;
   color?: string;
   textColor?: string;
   spinnerColor?: string;
   disabled?: boolean;
   icon?: Component | Element;
   borderColor?: string;
   borderWidth?: number;
   flatType?: boolean
   onPress?: () => void;
   buttonStyleProps?: StyleProp<ViewStyle>
};

const Button: React.FC<ButtonProps> = React.memo(props => {
   const {
      title,
      onPress,
      spinner,
      color,
      spinnerColor,
      textColor,
      disabled,
      icon,
      flatType,
      borderColor,
      borderWidth,
      buttonStyleProps
   } = props;

   const { s } = useThemeContext(createStyle);

   const { buttonStyle, textStyle, iconStyle } = React.useMemo(() => {
      return {
         buttonStyle: [
            s?.button, {
               backgroundColor: disabled ? colors.gray6 : color,
               borderColor,
               borderWidth,
               borderRadius: flatType ? 10 : 100,
            }
         ],
         textStyle: [
            s?.buttonText, {
               color: textColor
            }
         ],
         iconStyle: [
            !!title ? s?.iconPos : null
         ]
      };
   }, [color, disabled, spinner]);

   return (
      <TouchableOpacity
         style={[buttonStyle, buttonStyleProps]}
         disabled={disabled || spinner}
         onPress={onPress}>
         {icon &&
            <View style={iconStyle}>{icon}</View>
         }
         {spinner ? (
            <ActivityIndicator color={spinnerColor} size={"large"} />
         ) : (
               !!title &&
               <Text style={textStyle}>{title}</Text>
            )}
      </TouchableOpacity>
   );
});

Button.defaultProps = {
   spinner: false,
   color: colors.mainBlue,
   spinnerColor: colors.white,
   disabled: false,
   textColor: '#fff',
   borderColor: '#fff',
   borderWidth: 0
}

export { Button };
