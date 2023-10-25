import React, { memo } from 'react';
import {
   Dimensions, ScrollView, Text,
   TouchableOpacity,
   View
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { metrics } from '~/ui/theme/default/metrics';
import { createStyle } from './SizePickerStyles';

type ItemType = { value: string, picked: boolean, id: string, date?: string }

const { width } = Dimensions.get('window');

export type SizePickerProps = {
   items: ItemType[];
   fontSize?: number;
   promotion?: boolean;
   defaultTextColor?: string;
   pickedTextColor?: string;
   pickedBackgroundColor?: string;
   onItemSelect(id: string): void;
};

const SizePicker: React.FC<SizePickerProps> = ({
   fontSize,
   items,
   promotion,
   defaultTextColor,
   pickedTextColor,
   pickedBackgroundColor,
   onItemSelect
}) => {

   const { s } = useThemeContext(createStyle);

   return (
      <View style={s?.container}>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={s?.scrollView}>
            {items.map((item: ItemType, idx) => {
               return (
                  <TouchableOpacity key={'SizePicker: ' + idx} style={[s?.item,
                  {

                     width: promotion ? 100 : 43,
                     height: promotion ? 48 : 29,
                     borderWidth: promotion ? metrics.borderWidth : 0,
                     borderColor: promotion ? colors.lightGray : undefined,
                     marginRight: promotion ? width * 0.095 : metrics.x05
                  },
                  item.picked ? { backgroundColor: pickedBackgroundColor } : {}
                  ]}
                     onPress={() => onItemSelect(item.id)}>
                     <Text style={[s?.itemText, {
                        color: item.picked ? pickedTextColor : defaultTextColor,
                        fontSize: fontSize
                     }]}>
                        {item.value}
                     </Text>
                  </TouchableOpacity>
               )
            })}
         </ScrollView>
      </View>
   );
};

SizePicker.defaultProps = {
   fontSize: metrics.x4,
   defaultTextColor: colors.black,
   pickedTextColor: colors.white,
   pickedBackgroundColor: colors.mainBlue
}


const SizePickerM = memo(SizePicker);
export { SizePickerM as SizePicker };
