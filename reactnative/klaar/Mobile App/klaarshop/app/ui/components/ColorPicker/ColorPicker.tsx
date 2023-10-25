import React, { memo } from 'react';
import {
   TouchableOpacity,
   View,
   ScrollView
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '~/ui/theme/default/colors';
import styles from './ColorPickerStyles';

type ItemType = { photo: string, picked: boolean, id: string }

export type ColorPickerProps = {
   items: ItemType[];
   onItemSelect(id: string): void;
};


const ColorPicker: React.FC<ColorPickerProps> = ({
   items,
   onItemSelect
}) => {

   return (
      <View style={styles.container}>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {items.map((item: ItemType) => {
               return (
                  <TouchableOpacity key={'ColorPicker' + item.id} style={[styles.item, {
                     borderWidth: item.picked ? 1 : 0,
                     borderColor: colors.mainBlue
                  }]}
                     onPress={() => onItemSelect(item.id)}>
                     <FastImage source={{ uri: item.photo }} style={styles.colorContainer} />
                  </TouchableOpacity>
               )
            })}
         </ScrollView>
      </View>
   );
};


const ColorPickerM = memo(ColorPicker);
export { ColorPickerM as ColorPicker };