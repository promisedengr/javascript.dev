import React, { memo, Component } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native';
import { createStyle } from './CustomButtonStyles';
import { useThemeContext } from '~/ui/theme';
import { colors } from './../../theme/default/colors';
import { theme } from './../../theme/default/theme';

export type CustomButtonProps = {
  title?: string | object;
  error?: boolean;
  spinner?: boolean;
  spinnerSize?: "large" | "small";
  bgColorActive?: string;
  bgColorUnactive?: string;
  bgColorError?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleFontWeight?: string;
  spinnerColor?: string;
  disabled?: boolean;
  borderWidth?: number;
  borderRadius?: number;
  borderColorActive?: string;
  borderColorUnactive?: string;
  icon?: Component | Element;
  buttonDescription?: Component | Element; 
  onPress?: () => void;
};


const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  spinner,
  bgColorActive,
  bgColorUnactive,
  bgColorError,
  error,
  titleColor,
  titleFontWeight,
  titleFontSize,
  spinnerColor,
  spinnerSize,
  disabled,
  borderWidth,
  borderRadius,
  borderColorActive,
  borderColorUnactive,
  icon,
  buttonDescription,
  onPress
}) => {

  const { s } = useThemeContext(createStyle);

  const { buttonStyle, textStyle, iconStyle } = React.useMemo(() => {
    return {
      buttonStyle: [
        s?.button, {
          backgroundColor: !error? disabled? bgColorUnactive: bgColorActive: bgColorError, 
          borderColor: disabled? borderColorUnactive: borderColorActive, 
          borderWidth: borderWidth,
          borderRadius: borderRadius
        }
      ],
      textStyle: [
        {
          color: titleColor,
          fontWeight: titleFontWeight,
          fontSize: titleFontSize
        }
      ],
      iconStyle: [
        {

        }
      ]
    };
  }, 
  [
    bgColorActive, bgColorUnactive, borderColorUnactive, 
    borderColorActive, disabled, spinner, borderWidth,
    borderRadius, titleColor, titleFontWeight,
    titleFontSize
  ]);

  return (
    <View style={s?.relativeContainer}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled || spinner}
        onPress={onPress}>
        {icon&& 
          <View style={iconStyle}>{icon}</View>
        }
        {spinner ? (
          <ActivityIndicator color={spinnerColor} size={spinnerSize}/>
        ) : (
          !!title &&
            <Text style={textStyle}>{title}</Text>
        )}
      </TouchableOpacity>
      {!!buttonDescription &&
        <View style={s?.buttonDescriptionContainer}>
          {buttonDescription}
        </View>
      }
    </View>
  );
};

CustomButton.defaultProps={
  spinner: false,
  titleColor: colors.white,
  spinnerColor: colors.white,
  titleFontWeight: '600',
  disabled: false,
  borderWidth: 0,
  borderRadius: 14,
  titleFontSize: 17,
  bgColorError: theme.colors.red,
  error: false,
  spinnerSize: "large"
}


const CustomButtonM = memo(CustomButton);
export { CustomButtonM as CustomButton };