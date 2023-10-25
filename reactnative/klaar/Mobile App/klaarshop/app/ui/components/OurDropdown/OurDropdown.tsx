import React from 'react';
import { Text, TextInputProps, View } from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from 'react-i18next';
import { createStyle } from './OurDropdownStyles';
import { colors } from '~/ui/theme/default/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import ArrowDownIcon from './assets/arrowDown';
import DatePicker from 'react-native-datepicker';

export type OurDropdownProps = TextInputProps & {
   value: string;
   data?: object;
   required?: boolean;
   activeColor?: string;
   unactiveColor?: string;
   textColor?: string;
   tintColor?: string;
   fontSize?: number;
   inputLabel: string;
   errorColor?: string;
   validationOk?: undefined | boolean;
   bgColor?: string;
   setValue: any;
   setItems: any;
   onChangeValue: (text: any) => void;
   timePickerMode?: boolean;
   datePickerMode?: boolean;
};


const OurDropdown: React.FC<OurDropdownProps> = React.memo(props => {
   const {
      onChangeText,
      value,
      data,
      required,
      unactiveColor,
      activeColor,
      errorColor,
      textColor,
      tintColor,
      fontSize,
      inputLabel,
      validationOk,
      bgColor,
      timePickerMode,
      datePickerMode,
      setItems,
      setValue,
      onChangeValue
   } = props;

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const labelText = <Text>{inputLabel} {required ? <Text style={s?.requiredMark}>*</Text> : ''}</Text>;
   const [open, setOpen] = React.useState(false);

   // console.log('dropdown', data)

   return (
      <View style={[
         s?.containerStyle, {
            borderColor: (value !== t('notSelected')
               && value !== undefined
               && value !== 'Не выбрано') ? validationOk === false ? errorColor : activeColor : unactiveColor,
            backgroundColor: bgColor
         }
      ]}>
         {(timePickerMode === false && datePickerMode === false) ?
            <DropDownPicker
               open={open}
               value={value}
               items={data}
               setOpen={setOpen}
               setValue={setValue}
               setItems={setItems}
               containerStyle={s?.textField}
               labelStyle={s?.label}
               placeholder={labelText}
               style={s?.dropdown}
               dropDownContainerStyle={s?.dropDownContainerStyle}
               placeholderStyle={s?.placeholder}
               // showArrowIcon={true}
            />
            :
            <DatePicker
               style={s?.textField}
               date={value}
               placeholder={labelText}
               mode={timePickerMode === true ? "time" : "date"}
               confirmBtnText="Confirm"
               cancelBtnText="Cancel"
               onDateChange={(date: string) => onChangeValue(date)}
               iconSource={require('./assets/arrowImg.png')}
               iconComponent={
                  <View style={s?.iconTime}>
                     <ArrowDownIcon w={15} h={10} />
                  </View>
               }
               customStyles={{
                  dateInput: s?.timeInput,
                  dateText: s?.timeText
               }}
            />
         }

      </View>
   );
});

OurDropdown.defaultProps = {
   activeColor: colors.mainBlue,
   unactiveColor: colors.lightGray,
   textColor: colors.black,
   fontSize: 16,
   tintColor: colors.gray7,
   required: false,
   errorColor: colors.red,
   validationOk: undefined,
   bgColor: colors.white,
   timePickerMode: false,
   datePickerMode: false
}

export { OurDropdown };
