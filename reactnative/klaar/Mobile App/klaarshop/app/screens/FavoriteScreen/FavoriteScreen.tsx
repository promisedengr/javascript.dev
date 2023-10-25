import React, { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, FlatList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from '~/logic/AlertService/AlertService'
import { productActions } from '~/logic/product/ProductRedux'
import { productSelector } from '~/logic/product/ProductSelectors'
import { ProductType } from '~/logic/profile/ProfileRedux'
import { Header } from '~/ui/components/Header'
import { Preloader } from '~/ui/components/Preloader/Preloader'
import { ProductItem } from '~/ui/components/ProductItem'
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency'
import { Theme, useThemeContext } from '~/ui/theme'
import { theme } from '~/ui/theme/default/theme'
import { navigationService } from '../NavigationService'

interface FavoriteScreenProps { }

const FavoriteScreen: FC<FavoriteScreenProps> = (props) => {

   const { t } = useTranslation();
   const { s } = useThemeContext(createStyle);
   const dispatch = useDispatch();

   const {
      getFollowedProducts: {
         data: followedProductsData,
         fetching: followedProductsFetching,
         error: followedProductsError
      }
   } = useSelector(productSelector)

   useEffect(() => {
      if (followedProductsError?.description)
         showError(followedProductsError.description);
   }, [followedProductsError]);

   const [loadMore, setLoadMore] = useState(false)
   const [itemsIndex, setItemsIndex] = useState(15)

   if (!followedProductsFetching && loadMore) {
      console.log(`LoadMore toggle`)
      setLoadMore(false)
   }

   const onLoadMore = () => {
      setItemsIndex(itemsIndex + 15)

      const payload = {
         index: `${itemsIndex + 15}`,
      } as { index: string }

      dispatch(productActions.getFollowedProducts.request(payload))
   }

   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }

   useEffect(() => {
      dispatch(productActions.getFollowedProducts.request({ index: `0` }))
   }, [])

   const onPressFavorite = (productID: string, favorite: boolean) => {
      dispatch(productActions.subscribe.request({ productId: productID, isFavorite: favorite, reducerName: `Products` }))
   }

   const onProductPress = useCallback(
      (productId: string) => {
         dispatch(productActions.getProductById.request({ productId }))
         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'ProductInfoScreen',
               passProps: { reducerName: `Products` },
               options: { animations: { push: { enabled: true } } }
            },
         });
      }, [])

   const onEndReached = () => {
      if (!loadMore && (followedProductsData!.products.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }

   const renderItems = ({ item, index }: { item: ProductType, index: number }) => {

      const onSellerPress = (sellerId: string) => {

         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'SellerScreen',
               passProps: { sellerId },
               options: {
                  animations: {
                     push: {
                        enabled: true
                     }
                  }
               }
            },
         })
      }

      return (<>
         <View key={index} style={s?.itemContainer}>
            <ProductItem
               sellerId={item.seller._id}
               productID={item._id}
               productImage={{ uri: item.mainPhoto }}
               sellerImage={{ uri: item.seller.photo }}
               productRating={item.seller.rating}
               productFollowers={item.seller.numReviews}
               productCategory={item.category.name}
               productName={item.name}
               productColorsArray={item.colors}
               productPriceCurrency={defineCurrency(item.currency as `rub` | `usd`)}
               productPriceDefault={`0`}
               productSizeMin={item.sizes[0]}
               productSizeMax={item.sizes[item.sizes.length - 1]}
               productPriceGroup={`${item.price}`}
               favorite={item.youSubscribed}
               //  newProduct={item.new}
               onItemSelect={onProductPress}
               youOwner={item.youOwner}
               onSellerPress={onSellerPress}
               onPressFavorite={onPressFavorite}
               isRequiredSizes={item.category.requiredFields.sizes}
               isRequiredColors={item.category.requiredFields.colors}
            />
         </View>
         {followedProductsData && followedProductsData?.products.length % 2 !== 0 && followedProductsData.products.length - 1 === index
            ? <View style={s?.itemContainer} />
            : null}
      </>
      )
   }

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : followedProductsData && (followedProductsData?.products.length % 15 === 0)
            ? <View style={{ height: 50 }} /> : null
   )

   return (
      <View style={{ flex: 1 }}>
         <View style={s?.container}>
            <Header
               headerLeft={`arrow`}
               onPressBack={onBackPress}
               bgColor={theme.colors.transparent}
               headerTitleFontSize={17}
               headerTitle={t('profile.favorites')}

            />
            {followedProductsFetching
               ? <Preloader />
               : <FlatList
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  contentContainerStyle={s?.itemsContainer}
                  data={followedProductsData?.products}
                  renderItem={renderItems}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={footerLoader(followedProductsFetching && loadMore)}
               />
            }

         </View>
      </View>
   )
}

export default FavoriteScreen

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1
      },
      itemsContainer: {
         flexGrow: 1,
         marginHorizontal: theme.metrics.x2
      },
      itemContainer: {
         flex: .5,
         margin: theme.metrics.x2,
      },
   })