import React, { forwardRef, RefAttributes, memo, useState } from 'react';
import { Text, TextInputProps, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { metrics } from './../../theme/default/metrics';
import { createStyle } from './TextInputStyles';

type Props = TextInputProps & {
   value: string | number;
   required?: boolean;
   activeColor?: string;
   unactiveColor?: string;
   textColorCustom?: string;
   tintColor?: string;
   fontSize?: number;
   inputLabel?: string | object;
   iconLeftDefault?: Element;
   iconLeftError?: Element;
   iconRightSuccess?: Element;
   iconRightError?: Element;
   validationOk?: undefined | boolean;
   errorColor?: string;
   editable?: boolean;
   errorMsg?: string;
   inputLine?: boolean;
   secureTextEntry?: boolean;
   multiline?: boolean;
   maxSymbols?: number;
   bgColor?: string;
   bottomLine?: boolean
};


const TextInput: React.FC<Props & RefAttributes<TextField>> = React.memo(forwardRef((props, ref) => {
   const {
      onChangeText,
      inputLabel,
      editable,
      activeColor,
      unactiveColor,
      textColorCustom,
      fontSize,
      tintColor,
      bgColor,
      iconLeftDefault,
      iconLeftError,
      iconRightError,
      iconRightSuccess,
      validationOk,
      errorColor,
      errorMsg,
      value = ``,
      required,
      inputLine,
      secureTextEntry,
      multiline,
      maxSymbols,
      bottomLine,

      ...restProps
   } = props;

   const [isActive, setIsActive] = useState(false);
   const [isTouched, setIsTouched] = useState(false)
   const { s } = useThemeContext(createStyle);

   const onFocusPress = () => {
      setIsTouched(true)
      setIsActive(true)
   }

   const labelText = <Text>{inputLabel} {required ? <Text style={s?.requiredMark}>*</Text> : ''}</Text>;

   return (
      <View style={[
         s?.globalContainerStyle, {
            marginBottom: (validationOk === false && !!errorMsg) ? metrics.x4 : 0
         }
      ]}>
         {
            <View style={s?.errorMsgContainer}>
               <Text style={[s?.errorMsg, { color: errorColor }]}>
                  {validationOk === false && !!errorMsg && errorMsg}
               </Text>
            </View>
         }
         {bottomLine && <View style={[s?.bottomLine, validationOk ? {} : { borderBottomColor: errorColor }]} />}
         <View style={[
            s?.containerStyle, {
               borderColor: !validationOk && isTouched ? errorColor : isActive ? activeColor : unactiveColor,
               height: multiline ? undefined : 60,
               borderRadius: inputLine ? 0 : 10,
               borderWidth: inputLine ? 0 : 0.7,
               paddingLeft: multiline ? 25 : !!iconLeftDefault ? 65 : 25,
               backgroundColor: bgColor
            }
         ]}>
            {iconLeftDefault &&
               <View style={s?.leftIconContainer}>
                  {validationOk || validationOk === undefined ? iconLeftDefault : iconLeftError}
               </View>
            }
            {/* !!value && iconRightSuccess && iconRightError && (validationOk !== undefined) && */
               <View style={s?.rightIconContainer}>
                  {validationOk ? iconRightSuccess : iconRightError}
               </View>
            }
            <TextField
               ref={ref}

               textColor={validationOk === false ? errorColor : textColorCustom}
               onFocus={onFocusPress}
               onBlur={() => value.length === 0 ? setIsActive(false) : null}
               containerStyle={[
                  s?.textField,
                  multiline ? s?.textFieldWide : s?.textFieldDefaultWidth,
               ]}
               labelTextStyle={s?.labelText}
               numberOfLines={11}
               activeLineWidth={0} lineWidth={0}
               label={labelText}

               characterRestriction={multiline ? maxSymbols : undefined}
               maxLength={multiline ? maxSymbols : undefined}
               {...props}
            />

         </View>
      </View>
   );
}));

TextInput.defaultProps = {
   editable: true,
   activeColor: colors.mainBlue,
   unactiveColor: colors.lightGray,
   textColorCustom: colors.black,
   fontSize: 16,
   tintColor: colors.gray7,
   required: false,
   secureTextEntry: false,
   multiline: false,
   maxSymbols: 100,
   errorColor: colors.red,
   validationOk: undefined,
   errorMsg: '',
   bgColor: colors.white
}

const TextInputM = memo(TextInput);
export { TextInputM as TextInput };
