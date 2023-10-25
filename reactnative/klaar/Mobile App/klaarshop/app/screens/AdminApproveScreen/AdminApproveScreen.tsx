import React, { memo, FC, useState, useEffect, useCallback } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { View } from 'react-native'
import { useThemeContext } from '~/ui/theme'
import { Theme } from '~/ui/theme'
import { SearchInput } from '~/ui/components/SearchInput'
import { colors } from '~/ui/theme/default/colors'
import { useTranslation } from 'react-i18next'
import { metrics } from '~/ui/theme/default/metrics'
import { navigationService } from '../NavigationService'
import { Navigation } from 'react-native-navigation'
import { ProductItem } from '~/ui/components/ProductItem'
import { Preloader } from '~/ui/components/Preloader/Preloader'
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency'
import { ProductType } from '~/logic/profile/ProfileRedux'
import { useDispatch, useSelector } from 'react-redux'
import { CurrencyT, productActions } from '~/logic/product/ProductRedux'
import { productSelector } from '~/logic/product/ProductSelectors'
import { cartProductsSelector } from '~/logic/cart/CartSelectors'
import { Header } from '~/ui/components/Header'

export type AdminApproveScreenProps = {};

const AdminApproveScreen: FC<AdminApproveScreenProps> = (props) => {
   const { } = props
   const { s } = useThemeContext(createStyle)
   const { t } = useTranslation()
   const dispatch = useDispatch()

   const {
      getUnaviableList: {
         data: unavaibleListData,
         fetching: unavaibleListFetching

      } 
   } = useSelector(productSelector);

   const cartProducts = useSelector(cartProductsSelector)

   const [searchValue, setSearchValue] = useState(``)
   const [loadMore, setLoadMore] = useState(false)
   const [itemsIndex, setItemsIndex] = useState(15)

   const onBackPress = () => Navigation.pop(navigationService.getCurrentScreenId())


   const onCancelPress = () => {
      setSearchValue(``)
   }

   useEffect(() => {
      dispatch(productActions.getUnaviableList.request({ index: `0` }))
   }, [])


   const onLoadMore = () => {

      setItemsIndex(itemsIndex + 15)

      const payload = {
         index: `${itemsIndex + 15}`,
      } as { index: string }

      dispatch(productActions.getUnaviableList.request(payload))
   }


   const onAcceptPress = (productId: string) => {
      dispatch(productActions.approveProduct.request({ productId, type: `approve` }))
   }

   const onDeclinePress = (productId: string) => {
      dispatch(productActions.approveProduct.request({ productId, type: `unapprove` }))
   }


   const onEndReached = () => {
      if (!loadMore && (unavaibleListData!.products.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }


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

   const onProductPress = useCallback(
      (productId: string) => {
         dispatch(productActions.getProductById.request({ productId }))
         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'ProductInfoScreen',
               passProps: { cartLength: cartProducts ? cartProducts.length : 0 },
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

   const renderItems = ({ item, index }: { item: ProductType, index: number }) => {

      if (item?.name.toLowerCase().includes(searchValue.toLowerCase())) {
         return (
            <>
               <View key={index} style={s?.itemContainer}>
                  <ProductItem
                     productFollowers={item!.seller.numReviews}
                     onAcceptPress={onAcceptPress}
                     onDeclinePress={onDeclinePress}
                     productID={item!._id}
                     productImage={{ uri: item!.mainPhoto }}
                     sellerImage={{ uri: item!.seller.photo }}
                     productRating={item!.seller.rating}
                     productCategory={item!.category.name}
                     productName={item!.name}
                     productColorsArray={item!.colors}
                     productPriceCurrency={defineCurrency(item!.currency as CurrencyT)}
                     productPriceGroup={`${item!.price}`}
                     productSizeMin={item!.sizes[0]}
                     productSizeMax={item!.sizes[item!.sizes.length - 1]}
                     favorite={item!.youSubscribed}
                     onItemSelect={() => onProductPress(item!._id)}
                     onPressFavorite={() => { }}
                     isAdmin
                     sellerId={item!.seller._id}
                     onSellerPress={onSellerPress}
                  />
               </View>
               {unavaibleListData && unavaibleListData?.products.length % 2 !== 0 && unavaibleListData.products.length - 1 === index
                  ? <View style={s?.itemContainer} />
                  : null}
            </>
         )
      }
      else {
         return null
      }


   }

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : unavaibleListData && (unavaibleListData?.products.length % 15 === 0) ? < View style={{ height: 50 }} /> : null
   )

   return (
         <View style={{ flex: 1 }}>
            <Header
      
               onPressBack={onBackPress}
               headerLeft={`arrow`}
               headerCenterWidth={`80%`}
               headerLeftWidth={`15%`}
               headerCenter={<SearchInput  value={searchValue} onChangeText={setSearchValue} />}
               headerRightWidth={`5%`}
               borderBottomWidth={0}
            />
            {unavaibleListFetching || !unavaibleListData
               ? <Preloader />
               : <FlatList
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  contentContainerStyle={s?.itemsContainer}
                  data={unavaibleListData.products}
                  renderItem={renderItems}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={footerLoader(unavaibleListFetching && loadMore)}
               />}
         </View>
   );
};




const MemorizedComponent = memo(AdminApproveScreen)
export { MemorizedComponent as AdminApproveScreen }


export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: theme.colors.lightGray3,
      },
      headerContainer: {
         width: '100%',
         height: 60,
         flexDirection: `row`,
         alignItems: `center`,

      },
      searchInput: {
         flex: 15,
      },
      backIcon: {
         flex: 3,
         justifyContent: `center`
      },
      backIconWrapper: {
         paddingLeft: metrics.x2,
         width: `100%`,
         height: `100%`,
         justifyContent: `center`
      },
      cancelText: {
         fontSize: 17,
         fontWeight: "400",
         color: colors.black,
      },
      cancelWrapper: {
         flex: 5,
         justifyContent: `center`,
         alignItems: `center`
      },
      half: {
         width: '48%'
      },
      marginTopx4: {
         marginTop: theme.metrics.x4
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