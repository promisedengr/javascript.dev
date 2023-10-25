import React, { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { usePriceDefine } from '~/Hooks/usePriceDefine';

import { PaymentActions } from '~/logic/payment/PaymentRedux';
import { paymentSelector } from '~/logic/payment/PaymentSelectors';
import { CurrencyT, productActions } from '~/logic/product/ProductRedux';
import { ProfileActions } from '~/logic/profile/ProfileRedux';
import { profileSelector } from '~/logic/profile/ProfileSelectors';
import { userSelector } from '~/logic/user/UserSelectors';
import { Button } from '~/ui/components/Button';
import { CartItem } from '~/ui/components/CartItem';
import ItemLayout from '~/ui/components/CartItem/ItemLayout';
import { Checkbox } from '~/ui/components/Checkbox';
import { Header } from '~/ui/components/Header';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency';
import { Theme, useThemeContext } from '~/ui/theme'
import { colors, gradients } from '~/ui/theme/default/colors';
import BucketIcon from '../CartScreen/assets/bucket';
import { navigationService } from '../NavigationService';

interface Props {

}

const { width: w, height: h } = Dimensions.get(`screen`)

const ReviewsScreen = (props: Props) => {

   const { } = props

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();
   const dispatch = useDispatch()
   const [checkedId, setcheckedId] = useState(``)

   const {
      getReviwedProducts: {
         data: reviwedProductsData,
         fetching: reviwedProductsFetching
      }
   } = useSelector(profileSelector)


   useEffect(() => {
      if (!reviwedProductsFetching) {
         dispatch(ProfileActions.getReviwedProducts.request({ index: 0 }))
      }
   }, [])

   const onProductPress = useCallback(
      (productId: string) => {
         dispatch(productActions.getProductById.request({ productId }))
         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'ProductInfoScreen',
               passProps: {},
               options: {
                  animations: {
                     push: {
                        enabled: true
                     }
                  }
               }
            },
         });
      }, [])


   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }



   const onCheckPress = (id: string) => {
      if (checkedId === id) {
         setcheckedId(``)
      }
      else {
         setcheckedId(id)
      }
   }

   const {
      currentCurrency
   } = useSelector(userSelector)

   const currencyPriceFormat = usePriceDefine()

   return (
      <View style={s?.container}>
         <Header
            onPressBack={onBackPress}
            bgColor={colors.transparent}
            headerTitle={t(`profile.reviews`)}
            headerLeft={'arrow'}
         />
         {reviwedProductsFetching
            ? <Preloader />
            : <>
               <ScrollView style={s?.scrollView}>
                  {reviwedProductsData?.products.map((i, idx) => (
                     <ItemLayout key={idx} passiveMode
                        onItemPress={() => onProductPress(i._id)}
                        item={{
                           minSize: i.sizes[0],
                           maxSize: i.sizes[i.sizes.length - 1],
                           idx,
                           price: currencyPriceFormat({ price: i.price, currency: i.currency as CurrencyT }),
                           productColorsArray: i.colors,
                           productName: i.name,
                           productImage: { uri: i.mainPhoto },
                           currentCurrency: defineCurrency(currentCurrency)
                        }}
                        isChecked={checkedId === i._id}
                        onCheckPress={() => onCheckPress(i._id)}

                        borderBottom={idx === reviwedProductsData?.products.length - 1} />
                  ))}

               </ScrollView>
            </>
         }
      </View>
   )
}



const ReviewsScreenM = memo(ReviewsScreen)
export { ReviewsScreenM as ReviewsScreen };

export const createStyle = (theme: Theme) =>
   StyleSheet.create({

      alignItemsCenter: {
         alignItems: 'center'
      },

      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      container: {
         flex: 1
      },

      buttonContainer: {
         height: 56,
         width: w - theme.metrics.x4 * 2,
         marginBottom: 34
      },
      scrollView: {
         flexGrow: 1,
         marginTop: theme.metrics.x4
      }
   })