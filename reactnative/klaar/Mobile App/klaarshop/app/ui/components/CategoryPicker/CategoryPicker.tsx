import React, { Component, memo } from 'react';
import {
  ScrollView,

  StyleSheet, Text, TouchableOpacity,
  View
} from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';

type ItemType = {icon: Component, name: string}

export type CategoryPickerProps = {
  items: ItemType[];
  onItemSelect(name: string): void;
};


const CategoryPicker: React.FC<CategoryPickerProps> = ({
  items,
  onItemSelect
}) => {
  const { s } = useThemeContext(createStyle);

  return (
    <View style={s?.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={s?.scrollView}>
        {items.map((item: ItemType) => {
          return(
            <TouchableOpacity key={'ColorPicker' + item.name} style={[s?.item]} 
              onPress={() => onItemSelect(item.name)}>               
                {item.icon}
                <Text style={s?.nameText}>{item.name}</Text>
            </TouchableOpacity>
          )
      })}
    </ScrollView>
    </View>
  );
};


const CategoryPickerM = memo(CategoryPicker);
export { CategoryPickerM as CategoryPicker };

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    scrollView: {
      paddingVertical: 10
    },
    item: {
      marginRight: 14,
      borderRadius: 12,
      padding: 15,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    nameText: {
      fontSize: 14,
      color: theme.colors.silver,
      textTransform: 'capitalize',
      marginTop: 15
    }
  });