import React, { memo } from "react";
import { View, Image, ImageSourcePropType, Text } from "react-native";
import { createStyle } from './CardItemStyles';
import { useThemeContext } from '~/ui/theme';
import { BaseItem } from '~/ui/components/BaseItem';
import { Checkbox } from '~/ui/components/Checkbox';
import { colors } from '~/ui/theme/default/colors';

export interface CardItemProps {
  cardImg: ImageSourcePropType;
  checked: boolean;
  endDate: string;
  lastDigits: string;
  checkboxBorderColor: string;
  onCheck: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
  cardImg,
  checked,
  lastDigits,
  endDate,
  checkboxBorderColor,
  onCheck
}) => {

  const { s } = useThemeContext(createStyle);

  return (
    <View style={s?.baseContainer}>
      <BaseItem
        leftStyle={s?.cardPhoto}
        marginTop={false}
        left={
          <Image source={cardImg} style={s?.imgStyle}/>          
        } 
        right={
          <Checkbox
            onPress={() => onCheck()}
            size={18}
            isChecked={checked}
            borderColor={checkboxBorderColor}
            checkedColor={colors.orange}
            circle={true}
            borderWidth={1}
          />
        }
      >
        <View style={s?.infoContainer}>
          <Text style={s?.lastDigitsText}>
            {'.... ' + lastDigits}
          </Text>
          <Text style={s?.endDateText}>
            {endDate}
          </Text>
        </View>
      </BaseItem>
    </View>
  );
};

const CardItemM = memo(CardItem);
export {CardItemM as CardItem};