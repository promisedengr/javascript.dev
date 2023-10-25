import i18next from 'i18next';
import React, { memo } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';
import ClearIcon from './assets/ClearIcon';
import SearchIcon from './assets/search';
import { createStyle } from './SearchInputStyles';

type Props = TextInputProps & {
   value: string;
   textColor?: string;
   fontSize?: number;
   inputLabel?: string;
   height?: number;
   onChangeText: (text: string) => void;
   onFocus?: () => void;
   onBlur?: () => void;
   onClearPress?: () => void
};

const SearchInput: React.FC<Props> = React.memo(props => {
   const {
      onChangeText,
      value,
      textColor,
      fontSize,
      inputLabel,
      height = 45,
      onFocus = () => 1,
      onBlur = () => 1,
      onClearPress = () => 1
   } = props;

   const { s } = useThemeContext(createStyle);

   const onClearPressHandler = () => {
      onChangeText(``)
      onClearPress()
   }

   return (
      <View style={[s?.inputContainer]}>
         <View style={s?.searchIconContainer}>
            <SearchIcon w={16} h={16} />
         </View>
         <View style={s?.input}>
            <TextInput
               style={[{
                  fontSize: fontSize, color: textColor, padding: 0,
                  paddingVertical: metrics.x
               }]}
               onFocus={() => onFocus()}
               onBlur={() => onBlur()}
               placeholderTextColor={'#979CA0'}
               placeholder={inputLabel === 'Search'?i18next.t('inputs.search'):inputLabel}
               onChangeText={text => onChangeText(text)}
               value={value}
            />

         </View>
         <TouchableOpacity onPress={onClearPressHandler} style={s?.closeSearchIcon}>
            <ClearIcon width={20} height={20} />
         </TouchableOpacity>
      </View>
   );

})
SearchInput.defaultProps = {
   height: 45,
   inputLabel: 'Search',
   fontSize: 17,
   textColor: '#000'
}

const SearchInputM = memo(SearchInput);
export { SearchInputM as SearchInput };

