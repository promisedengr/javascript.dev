import * as React from 'react';
import { Component, useState, memo, useEffect } from 'react';
import {
   View,
   TextInput as RNITextInput,
   TextInputProps,
   Text,
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './OtpCodeEntryStyles';
import { metrics } from './../../theme/default/metrics';
import { colors } from './../../theme/default/colors';

type Props = TextInputProps & {
   values: string[];
   bgColor?: string;
   keyboardType?: string;
   onChangeInput(index: number, digit: string): void;
};


const OtpCodeEntry: React.FC<Props> = React.memo(props => {
   const {
      onChangeInput,
      bgColor,
      keyboardType,
      values,
      ...restProps
   } = props;

   const { s } = useThemeContext(createStyle);
   const [firstIn, setFirstIn] = useState(true);


   const inputRefs = [
      React.useRef<any>(),
      React.useRef<any>(),
      React.useRef<any>(),
      React.useRef<any>(),
   ]

   useEffect(() => {
      if (firstIn === true) {
         inputRefs[0].current.focus();
         setFirstIn(false);
      }
   });

   //console.log('values', values)

   const goNextAfterEdit = (index: number) => {
      if (index < 3 || values[index]) {
         if (values[index] && index >= 0) {
            inputRefs[index == 0 ? index : index - 1].current.focus()
         } else {
            inputRefs[index + 1].current.focus()
         }
      } else {
         inputRefs[index].current.blur()
      }
   }

   const renderInputs = () => {
      let layout: Element[] = [];
      values.map((item, index) => {
         layout.push(
            <View
               style={[
                  s?.digitInputContainer,
                  {
                     backgroundColor: item ? colors.white : colors.gray8,
                     borderColor: item ? colors.dark : colors.gray9
                  }
               ]}
               key={index}
            >
               <RNITextInput
                  style={[s?.digitInput]}
                  onChangeText={text => onChangeInput(index, text)}
                  value={item}
                  maxLength={1}
                  keyboardType={keyboardType}
                  ref={r => inputRefs[index].current = r}
                  onChange={() => goNextAfterEdit(index)}
               />
            </View>
         )
      })
      return layout;
   }

   return (
      <View style={[s?.container]}>
         {renderInputs()}
      </View>
   );
});

OtpCodeEntry.defaultProps = {
   bgColor: colors.white,
   keyboardType: `numeric`
}

const OtpCodeEntryM = memo(OtpCodeEntry);
export { OtpCodeEntryM as OtpCodeEntry };