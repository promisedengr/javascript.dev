import React, { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Text } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import { CurrencyT, productActions } from '~/logic/product/ProductRedux'
import { ProductType, ProfileActions } from '~/logic/profile/ProfileRedux'
import { profileSelector } from '~/logic/profile/ProfileSelectors'

import { Header } from '~/ui/components/Header'
import { Preloader } from '~/ui/components/Preloader/Preloader'
import { ProductItem } from '~/ui/components/ProductItem'
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency'
import { Theme, useThemeContext } from '~/ui/theme'
import { theme } from '~/ui/theme/default/theme'
import { navigationService } from '../NavigationService'

interface Props {

}

const MyAdsScreen: FC<Props> = (props) => {

   const { t } = useTranslation()
   const { s } = useThemeContext(createStyle);
   const dispatch = useDispatch()
   const {
      getSelfProducts: {
         data: getSelfProductsData,
         fetching: getSelfProductsFetching
      }
   } = useSelector(profileSelector)

   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }

   useEffect(() => {
      dispatch(ProfileActions.getSelfProducts.request({ index: `0` }))
   }, [])


   const onEditPress = (id: string) => {
      let pressedProduct: ProductType & { productId: string }

      getSelfProductsData?.products.map(i => {
         if (i._id === id) {
            pressedProduct = { ...i, productId: id }
         }
      })

      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            name: 'AddProductScreen',
            passProps: pressedProduct,
            options: {
               animations: {
                  push: {
                     enabled: true
                  }
               }
            }
         },
      });
   }


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

   return (
      <View style={s?.container}>
         <Header
            headerLeft={`arrow`}
            onPressBack={onBackPress}
            bgColor={theme.colors.transparent}
            headerTitleFontSize={17}
            headerTitle={t('profile.myAnnouncm')}
         />
         {getSelfProductsFetching || !getSelfProductsData
            ? <Preloader />
            : <ScrollView showsHorizontalScrollIndicator={false}>
               <View style={s?.itemsContainer}>
                  {getSelfProductsData.products.map((item, index) => {
                     return (
                        <View style={[s?.half, index > 1 ? s?.marginTopx4 : null]} key={index}>
                           <ProductItem
                              productFollowers={item.seller.numReviews}
                              productID={item._id}
                              productImage={{ uri: item.mainPhoto }}
                              sellerImage={{ uri: item.seller.photo }}
                              productRating={item.seller.rating}
                              productCategory={item.category.name}
                              productName={item.name}
                              productColorsArray={item.colors}
                              productPriceCurrency={defineCurrency(item.currency as CurrencyT)}
                              productPriceGroup={`${item.price}`}
                              productSizeMin={item.sizes[0]}
                              productSizeMax={item.sizes[item.sizes.length - 1]}
                              favorite={item.youSubscribed}
                              onItemSelect={onProductPress}
                              onEditPress={() => onEditPress(item._id)}
                              youOwner={item.youOwner}
                              isRequiredColors={item.category.requiredFields.colors}
                              isRequiredSizes={item.category.requiredFields.sizes}
                           />
                        </View>
                     )
                  })}
               </View>
               <View style={s?.MB} />
            </ScrollView>}
      </View>
   )
}

export { MyAdsScreen }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1
      },
      itemsContainer: {
         width: '100%',
         paddingVertical: theme.metrics.x4,
         paddingHorizontal: theme.metrics.x4,
         flexDirection: 'row',
         justifyContent: 'space-between',
         flexWrap: 'wrap'
      },
      half: {
         width: '48%'
      },
      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      MB: {
         height: theme.metrics.x4
      }
   })
