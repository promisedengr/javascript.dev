import * as React from 'react';
import { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Header } from '~/ui/components/Header';
import { useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { navigationService } from '../NavigationService';
import { createStyle } from './PaymentScreenStyles';
import { useTranslation } from 'react-i18next';
import { Button } from '~/ui/components/Button';
import { CartItem } from '~/ui/components/CartItem';
import { ShareModal } from '~/ui/components/ShareModal';

type PaymentScreenProps = {};

const PaymentScreen: React.FC<PaymentScreenProps> = props => { 
 
  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const defaultItems = [
    {
      key: '0',
      groupBuy: false,
      price: '24',
      minSize: '36',
      maxSize: '42',
      productName: 'Nike Sneakers',
      timeLeft: 50,
      productColorsArray: [
        require('~/ui/components/CartItem/assets/small1.png'),
        require('~/ui/components/CartItem/assets/small2.png'),
        require('~/ui/components/CartItem/assets/small3.png'),
        require('~/ui/components/CartItem/assets/small3.png')
      ],
      productImage: require('~/ui/components/ProductItem/assets/productImage.png')
    }
  ];

  const [cartItems, setCartItems] = useState(defaultItems);
  
  return (
    <View style={s?.container}>
      <ShareModal 
        modalVisible={modalVisible}
        onModalClose={() => setModalVisible(false)}
      />
      <Header
        bgColor={colors.transparent}
        headerTitle={t('ordering')}
        headerLeft={'arrow'}
        onPressBack={() => Navigation.pop(navigationService.getCurrentScreenId())}
      />
      <ScrollView style={s?.scrollViewStyle} contentContainerStyle={s?.scrollViewContainerStyle}>
        <View style={s?.inputWidth}>
          {cartItems.map((item, index) => {
            return (
              <CartItem 
                passiveMode={true}
                borderBottom={index === cartItems.length - 1}
                onSwipe={() => {
                  const newCartItems = [...cartItems];
                  newCartItems.splice(newCartItems.indexOf(item), 1);
                  setCartItems(newCartItems);
                }} {...{ item }} 
              />
          )})}
          <View style={s?.inputWidth}>
            <View style={[s?.infoRow, s?.borderBottom]}>
              <Text style={s?.leftGrayText}>
                {t('tovar')}
              </Text>
              <Text style={s?.rightGrayText}>
                {'24₽'}
              </Text>
            </View>
            <View style={[s?.infoRow, s?.borderBottom]}>
              <Text style={s?.leftGrayText}>
                {t('delivery')}
              </Text>
              <Text style={s?.rightGrayText}>
                {'10₽'}
              </Text>
            </View>
            <View style={s?.infoRow}>
              <Text style={s?.boldBlackText}>
                {t('totalPriceOfOrder')}
              </Text>
              <Text style={s?.boldBlackText}>
                {'34₽'}
              </Text>
            </View>
          </View>
        </View>
        <View style={[s?.alignItemsCenter, s?.marginTopx4]}>
          <View style={s?.buttonContainer}>
            <Button
              onPress={() => {}}
              title={t('pay')}
              color={colors.orange}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const MPaymentScreen = memo(PaymentScreen)
export { MPaymentScreen as PaymentScreen };