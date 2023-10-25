import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentActions } from '~/logic/payment/PaymentRedux';
import { paymentSelector } from '~/logic/payment/PaymentSelectors';
import { CartItem } from '~/ui/components/CartItem';
import { Checkbox } from '~/ui/components/Checkbox';
import { Header } from '~/ui/components/Header';
import { Theme, useThemeContext } from '~/ui/theme'
import { colors } from '~/ui/theme/default/colors';
import BucketIcon from '../CartScreen/assets/bucket';
import { navigationService } from '../NavigationService';

interface Props {

}

const { width } = Dimensions.get(`screen`)

const BuyHistoryScreen = (props: Props) => {


   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const dispatch = useDispatch()

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
         key: '2',
         groupBuy: false,
         price: '48',
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
      },
      {
         key: '3',
         groupBuy: true,
         price: '101',
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
      }
   ];


   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }



   return (
      <View style={s?.container}>
         <Header
            onPressBack={() => onBackPress()}
            bgColor={colors.transparent}
            headerTitle={t(`profile.purchaseHistory`)}
            headerLeft={'arrow'}
            borderBottomWidth={1}

         />
      </View>
   )
}



export { BuyHistoryScreen }


const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1
      },
      headerRight: {
         flexDirection: 'row',
         alignItems: 'center',
         width: width * 0.15,
         justifyContent: 'space-between'
      },
      inputWidth: {
         width: '100%'
      },
      scrollViewStyle: {
         paddingTop: theme.metrics.x4,
         marginBottom: theme.metrics.x4
      },
      scrollViewContainerStyle: {
         flexGrow: 1,
         justifyContent: 'space-between'
      }
   })