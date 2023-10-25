import React, { FC, memo } from 'react';
import {
   SafeAreaView, ScrollView, View, Text
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { createStyle } from './OrderingScreenStyles';
import { Navigation } from 'react-native-navigation';
import { navigationService } from '../NavigationService';
import { Header } from '~/ui/components/Header';
import { colors } from '~/ui/theme/default/colors';
import { useThemeContext } from '~/ui/theme';
import ItemLayout from '~/ui/components/CartItem/ItemLayout';
import { theme } from '~/ui/theme/default/theme';
import { Button } from '~/ui/components/Button';
import { useSelector } from 'react-redux';
import { userSelector } from '~/logic/user/UserSelectors';
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency';
import { usePriceDefine } from '~/Hooks/usePriceDefine';

type OrderingScreenProps = {
   cartItems?: {
      key: string
      groupBuy: boolean,
      price: string,
      minSize: string,
      maxSize: string,
      productName: string,
      productColorsArray: any[],
      productImage: any
   }[]
   transferPrice?: number
};

const OrderingScreen: FC<OrderingScreenProps> = props => {

   const defaultItems = [
      {
         key: '0',
         groupBuy: false,
         price: '24',
         minSize: '36',
         maxSize: '42',
         productName: 'Nike Sneakers',
         productColorsArray: [
            require('~/ui/components/CartItem/assets/small1.png'),
            require('~/ui/components/CartItem/assets/small2.png'),
            require('~/ui/components/CartItem/assets/small3.png'),
            require('~/ui/components/CartItem/assets/small3.png')
         ],
         productImage: require('~/ui/components/ProductItem/assets/productImage.png')
      }, ,
      {
         key: '1',
         groupBuy: false,
         price: '482',
         minSize: '36',
         maxSize: '42',
         productName: 'Adidas mad bounce 2018',
         productColorsArray: [
            require('~/ui/components/CartItem/assets/small1.png'),
            require('~/ui/components/CartItem/assets/small2.png'),
            require('~/ui/components/CartItem/assets/small3.png'),
            require('~/ui/components/CartItem/assets/small3.png')
         ],
         productImage: require('~/ui/components/ProductItem/assets/productImage.png')
      },
      {
         key: '1',
         groupBuy: false,
         price: '482',
         minSize: '36',
         maxSize: '42',
         productName: 'Adidas mad bounce 2018',
         productColorsArray: [
            require('~/ui/components/CartItem/assets/small1.png'),
            require('~/ui/components/CartItem/assets/small2.png'),
            require('~/ui/components/CartItem/assets/small3.png'),
            require('~/ui/components/CartItem/assets/small3.png')
         ],
         productImage: require('~/ui/components/ProductItem/assets/productImage.png')
      },
      {
         key: '1',
         groupBuy: false,
         price: '482',
         minSize: '36',
         maxSize: '42',
         productName: 'Adidas mad bounce 2018',
         productColorsArray: [
            require('~/ui/components/CartItem/assets/small1.png'),
            require('~/ui/components/CartItem/assets/small2.png'),
            require('~/ui/components/CartItem/assets/small3.png'),
            require('~/ui/components/CartItem/assets/small3.png')
         ],
         productImage: require('~/ui/components/ProductItem/assets/productImage.png')
      }
   ];

   const { cartItems = defaultItems, transferPrice = 10 } = props

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();



   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }

   const onButtonPress = () => {
      console.log(`Order`)
   }

   let value = 0

   cartItems.map(d => {
      if (d) {
         value = value + +d.price
      }
   })



   const {
      currentCurrency
   } = useSelector(userSelector)

   const currencyPriceFormat = usePriceDefine()

   return (
      <View style={s?.container}>
         <Header
            onPressBack={() => onBackPress()}
            bgColor={colors.transparent}
            headerTitle={t(`order.create`)}
            headerLeft={'arrow'}
         />
         <ScrollView style={{ flexGrow: 1 }}>
            {cartItems.map((i, idx) => (
               <ItemLayout key={idx} passiveMode item={{
                  ...i,
                  price: currencyPriceFormat({ price: +i.price, currency: i.currency as CurrencyT }),
                  currentCurrency: defineCurrency(currentCurrency)
               }} borderBottom={idx === cartItems.length - 1} />
            ))}

            <View style={s?.footer}>
               <View>
                  <Text style={s?.footerText}>
                     {t(`addProduct.products`)}
                  </Text>
               </View>
               <View>
                  <Text style={s?.footerText}>
                     {`${value}₽`}
                  </Text>
               </View>
            </View>
            <View style={s?.footer}>
               <Text style={s?.footerText}>
                  {t(`addProduct.delivery`)}
               </Text>
               <Text style={s?.footerText}>
                  {`${transferPrice}₽`}
               </Text>
            </View>
            <View style={s?.footerValue}>
               <Text style={s?.footerTextValue}>
                  {t(`order.orderamount`)}
               </Text>
               <Text style={s?.footerTextValue}>
                  {`${value + transferPrice}₽`}
                  {/* with or without delivery */}
                  {/* {`${value}₽`} */}

               </Text>
            </View>
         </ScrollView>
         <View style={[s?.alignItemsCenter, s?.marginTopx4]}>
            <View style={s?.buttonContainer}>
               <Button
                  onPress={() => onButtonPress()}
                  title={`${t('order.pay')} ${value + transferPrice}₽`}
                  color={colors.lightBlue2}
               />
            </View>
         </View>
      </View>
   )
}


const MOrderingScreen = memo(OrderingScreen)
export { MOrderingScreen as OrderingScreen };