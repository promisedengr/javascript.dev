import React, { memo } from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
  View
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import UserIcon from './assets/userIcon';
import UsersIcon from './assets/usersIcon';
import { createStyle } from './BuyNowButtonStyles';
import { useTranslation } from 'react-i18next';

export type BuyNowButtonProps = {
  productPriceCurrency: string;
  productPriceDefault: string;
  productPriceGroup: string;
  groupCountFrom: string;
  groupCountTo: string;
  height?: number;
  paddingBottom?: number | string;
  onBuyDefaultPressed(): void;
  onBuyGroupPressed(): void;
};


const BuyNowButton: React.FC<BuyNowButtonProps> = ({
  productPriceCurrency,
  productPriceDefault,
  productPriceGroup,
  groupCountFrom,
  groupCountTo,
  height,
  paddingBottom,
  onBuyDefaultPressed,
  onBuyGroupPressed
}) => {
  const { s } = useThemeContext(createStyle);

  const { t } = useTranslation();

  return (
    <View style={[s?.container, {height: height}]}>
      <TouchableOpacity style={[s?.button, s?.buttonLeft, {paddingBottom: paddingBottom}]} onPress={() => onBuyDefaultPressed()}>
        <View style={s?.rowLarge}>
          <View style={[s?.row, s?.iconContainerPosition]}>
            <UserIcon w={16} h={16}/>
            <Text style={s?.currencyText}>{productPriceCurrency}</Text>
          </View>
          <Text style={s?.priceText}>{productPriceDefault}</Text>
        </View>
        <View style={s?.column}> 
          <Text style={[s?.buyNowText, s?.buyNowTextDefault]}>{t('buyNow')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[s?.button, s?.buttonRight, {paddingBottom: paddingBottom}]} onPress={() => onBuyGroupPressed()}>
        <View style={s?.rowLarge}>
          <View style={[s?.row, s?.iconContainerPosition]}>
            <UsersIcon w={18} h={16}/>
            <Text style={[s?.currencyText, s?.whiteText]}>{productPriceCurrency}</Text>
          </View>
          <Text style={[s?.priceText, s?.whiteText]}>{productPriceGroup}</Text>
        </View>
        <View style={s?.column}> 
          <View style={s?.groupCountContainer}>
            <Text style={s?.groupCountText}>{groupCountFrom}/{groupCountTo}</Text>
          </View>
          <Text style={[s?.buyNowText, s?.whiteText]}>{t('buyNow')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

BuyNowButton.defaultProps = {
  height: 60,
  paddingBottom: '3%'
}


const BuyNowButtonM = memo(BuyNowButton);
export { BuyNowButtonM as BuyNowButton };