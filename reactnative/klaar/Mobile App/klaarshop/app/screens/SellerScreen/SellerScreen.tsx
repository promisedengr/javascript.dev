import _ from 'lodash';
import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, Share, ListRenderItem, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import { Header } from './../../ui/components/Header';
import { UserActions } from '~/logic/user/UserRedux';
import { UserInteractionActions } from '~/logic/userInteraction/UserInteractionRedux';
import { createStyle } from './SellerScreenStyles';
import { useThemeContext } from '~/ui/theme';
import { gradients, colors } from './../../ui/theme/default/colors';
import SettingsIcon from './assets/settings';
import { BaseItem } from '~/ui/components/BaseItem';
import { RenderStars } from '~/ui/components/RenderStars/renderStars';
import { Button } from '~/ui/components/Button';
import ShareIcon from '~/ui/components/Button/assets/share';
import { ProductItem } from '~/ui/components/ProductItem';
import { showError } from '~/logic/AlertService/AlertService';
import { userInteractionSelector } from '~/logic/userInteraction/UserInteractionSelectors';
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { navigationService } from '../NavigationService';
import { productActions } from '~/logic/product/ProductRedux';


type SellerScreenProps = {
   sellerId: string
}

const defaultProducts = {
   avaibleProducts: [
      //      {
      //       _id: `1`,
      //       rating: 4,
      //       numSubscribers: 47,
      //       category: `SHOES`,
      //       name: `Nike sneakers`,
      //       currency: `rub`,
      //       price: `211`,
      //       assosiate: { youSubscribed: true },
      //       new: true,
      //       photo: require('~/ui/components/ProductItem/assets/productImage.png'),
      //       sellerAvatar: require('~/ui/components/ReviewItem/assets/userTest.png'),
      //       colorsArray: [
      //           require('~/ui/components/ProductItem/assets/small1.png'),
      //           require('~/ui/components/ProductItem/assets/small2.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png')
      //       ],
      //       sizeMin: 36,
      //       sizeMax: 42
      //   },{
      //       _id: `1`,
      //       rating: 4,
      //       numSubscribers: 47,
      //       category: `SHOES`,
      //       name: `Nike sneakers`,
      //       currency: `rub`,
      //       price: `211`,
      //       assosiate: { youSubscribed: true },
      //       new: true,
      //       photo: require('~/ui/components/ProductItem/assets/productImage.png'),
      //       sellerAvatar: require('~/ui/components/ReviewItem/assets/userTest.png'),
      //       colorsArray: [
      //           require('~/ui/components/ProductItem/assets/small1.png'),
      //           require('~/ui/components/ProductItem/assets/small2.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png')
      //       ],
      //       sizeMin: 36,
      //       sizeMax: 42
      //   },{
      //       _id: `1`,
      //       rating: 4,
      //       numSubscribers: 47,
      //       category: `SHOES`,
      //       name: `Nike sneakers`,
      //       currency: `rub`,
      //       price: `211`,
      //       assosiate: { youSubscribed: true },
      //       new: true,
      //       photo: require('~/ui/components/ProductItem/assets/productImage.png'),
      //       sellerAvatar: require('~/ui/components/ReviewItem/assets/userTest.png'),
      //       colorsArray: [
      //           require('~/ui/components/ProductItem/assets/small1.png'),
      //           require('~/ui/components/ProductItem/assets/small2.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png')
      //       ],
      //       sizeMin: 36,
      //       sizeMax: 42
      //   },{
      //       _id: `1`,
      //       rating: 4,
      //       numSubscribers: 47,
      //       category: `SHOES`,
      //       name: `Nike sneakers`,
      //       currency: `rub`,
      //       price: `211`,
      //       assosiate: { youSubscribed: true },
      //       new: true,
      //       photo: require('~/ui/components/ProductItem/assets/productImage.png'),
      //       sellerAvatar: require('~/ui/components/ReviewItem/assets/userTest.png'),
      //       colorsArray: [
      //           require('~/ui/components/ProductItem/assets/small1.png'),
      //           require('~/ui/components/ProductItem/assets/small2.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png')
      //       ],
      //       sizeMin: 36,
      //       sizeMax: 42
      //   },{
      //       _id: `1`,
      //       rating: 4,
      //       numSubscribers: 47,
      //       category: `SHOES`,
      //       name: `Nike sneakers`,
      //       currency: `rub`,
      //       price: `211`,
      //       assosiate: { youSubscribed: true },
      //       new: true,
      //       photo: require('~/ui/components/ProductItem/assets/productImage.png'),
      //       sellerAvatar: require('~/ui/components/ReviewItem/assets/userTest.png'),
      //       colorsArray: [
      //           require('~/ui/components/ProductItem/assets/small1.png'),
      //           require('~/ui/components/ProductItem/assets/small2.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png')
      //       ],
      //       sizeMin: 36,
      //       sizeMax: 42
      //   },{
      //       _id: `1`,
      //       rating: 4,
      //       numSubscribers: 47,
      //       category: `SHOES`,
      //       name: `Nike sneakers`,
      //       currency: `rub`,
      //       price: `211`,
      //       assosiate: { youSubscribed: true },
      //       new: true,
      //       photo: require('~/ui/components/ProductItem/assets/productImage.png'),
      //       sellerAvatar: require('~/ui/components/ReviewItem/assets/userTest.png'),
      //       colorsArray: [
      //           require('~/ui/components/ProductItem/assets/small1.png'),
      //           require('~/ui/components/ProductItem/assets/small2.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png'),
      //           require('~/ui/components/ProductItem/assets/small3.png')
      //       ],
      //       sizeMin: 36,
      //       sizeMax: 42
      //   }
   ]
}

const defaultProfile = {
   fn: `Andrew`,
   ln: `Cherepchenko`,
   avatar: ``,
   numReviews: 69,
   country: `Kazakhstan`,
   rating: 4,
}

const SellerScreen: React.FC<SellerScreenProps> = ({ sellerId }) => {





   const dispatch = useDispatch();


   const [loadMore, setLoadMore] = useState(false)
   const [itemsIndex, setItemsIndex] = useState(15)

   const {
      getProfile: {
         data: getProfileData,
         fetching: getProfileFetching,
         error: getProfileError
      },
      getProducts: {
         data: getProductsData,
         fetching: getProductsFetching,
         error: getProductsError
      }

   } = useSelector(userInteractionSelector);

   if (!getProductsData && loadMore) {
      //console.log(`LoadMore toggle`)
      setLoadMore(false)
   }

   const onMessagePress = () => {
      dispatch(UserActions.startChatting.request({
         userId: sellerId
      }))
      dispatch(UserActions.mainScreenRoute(`notifications`))
      Navigation.setStackRoot(navigationService.getCurrentScreenId(), {
         component: {
            name: 'MainScreen',
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



   //console.log(getProductsData)

   // const {
   //    getByIdUser: {
   //       data: userData,
   //       fetching: userFetching
   //    }
   // } = useSelector(userSelector)


   //const myId = `5ff870a582416172d26f2673`

   useEffect(() => {
      dispatch(UserInteractionActions.getProfile.request({ userId: sellerId }))
      dispatch(UserInteractionActions.getProducts.request({ userId: sellerId, index: '0' }))
   }, [])

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();


   const onLoadMore = () => {
      setItemsIndex(itemsIndex + 15)
      dispatch(UserInteractionActions.getProducts.request({ userId: sellerId, index: `${itemsIndex}` }))
   }


   useEffect(
      () => {
         if (!!getProfileError?.description) {
            showError(getProfileError.description);
         }
      }, [getProfileError]
   );

   const onPressBack = () => Navigation.pop(navigationService.getCurrentScreenId())


   const onProductPress = useCallback(
      (productId: string) => {
         dispatch(productActions.getProductById.request({ productId }))
         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'ProductInfoScreen',
               passProps: { reducerName: `UserInteractions` },
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

   const onPressFavorite = (productID: string, favorite: boolean) => {
      dispatch(productActions.subscribe.request({ productId: productID, isFavorite: favorite, reducerName: `UserInteractions` }))
   }

   const onShare = async () => {
      try {
         const result = await Share.share({
            message:
               `Seller: ${getProfileData.fn} ${getProfileData.ln}, rating: ${getProfileData.rating}, reviews: ${getProfileData.numReviews} `,
         });
         if (result.action === Share.sharedAction) {
            if (result.activityType) {
               // shared with activity type of result.activityType
            } else {
               // shared
            }
         } else if (result.action === Share.dismissedAction) {
            // dismissed
         }
      } catch (error) {
         console.log(error.message);
      }
   };




   const _renderItem: ListRenderItem<any> = ({ item, index }) => {

      return (<>
         <View style={s?.itemContainer} key={index}>
            <ProductItem
               productID={item._id}
               productImage={{ uri: item.mainPhoto }}
               sellerImage={{ uri: item.seller.photo }}
               productRating={item.seller.rating}
               productFollowers={item.seller.numReviews}
               productCategory={item.category.name}
               productName={item.name}
               productColorsArray={item.colorsArray}
               productPriceCurrency={defineCurrency(item.currency)}
               productPriceDefault={item.price}
               productSizeMin={item.sizes[0]}
               productSizeMax={item.sizes[item.sizes - 1]}
               productPriceGroup={item.price}
               favorite={item.youSubscribed}
               onPressFavorite={onPressFavorite}
               // newProduct={item.new}
               onItemSelect={onProductPress}
               youOwner={item.youOwner}
            />
         </View>
         {getProductsData && getProductsData?.products.length % 2 !== 0 && getProductsData.products.length - 1 === index
            ? <View style={s?.itemContainer} />
            : null}
      </>
      )
   }


   const onEndReached = () => {
      if (!loadMore && (getProductsData!.products.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : getProductsData && (getProductsData?.products.length % 15 === 0) ? < View style={{ height: 50 }} /> : null
   )



   return (
      <View>
         <LinearGradient style={s?.container} colors={gradients.g3}>
            <Header
               headerLeft={'arrow'}
               // headerRight={
               //    <View style={s?.settingsIconContainer}>
               //       <SettingsIcon />
               //    </View>
               // }
               onPressBack={onPressBack}
               headerTitleFontSize={17}
               headerTitle={t('user.user')}
               borderBottomWidth={1}
               bgColor={colors.transparent}
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s?.scrollviewStyle}>
               {getProfileFetching || !getProfileData
                  ? <View style={s?.preloader}><Preloader /></View>
                  : <View style={{ width: '100%' }}>
                     <View style={s?.defaultContainer}>
                        <BaseItem
                           leftStyle={s?.clientPhoto}
                           marginTop={false}
                           left={
                              <FastImage source={{ uri: getProfileData.photo }} style={s?.userPic} />
                           }
                        >
                           <View style={s?.shortColumn}>
                              <Text style={s?.userNameText}>{`${getProfileData.fn} ${getProfileData.ln}`}</Text>
                              {/* <Text style={s?.userCityText}>
                                 {!!getProfileData.country ? getProfileData.country : t('countryNotSpecified')}
                              </Text> */}
                              <View style={s?.starsContainer}>
                                 <RenderStars rating={getProfileData.rating} />
                                 <Text style={s?.reviewsCountText}>{`(${getProfileData.numReviews})`}</Text>
                              </View>
                           </View>
                        </BaseItem>
                        <View style={[s?.horizontalFlex]}>
                           <View style={s?.mediumButtonContainer}>
                              <Button
                                 onPress={onMessagePress}
                                 title={t('user.message')}
                                 color={colors.lightBlue2}
                                 buttonStyleProps={{ marginVertical: 0, marginHorizontal: 0 }}
                              />
                           </View>
                           <View style={s?.smallButtonContainer}>
                              <Button
                                 buttonStyleProps={{ marginVertical: 0, marginHorizontal: 0 }}
                                 onPress={onShare}
                                 title=""
                                 color={'#fff'}
                                 borderWidth={0.5}
                                 borderColor={'#ccc'}
                                 icon={<ShareIcon w={22} h={22} />}
                              />
                           </View>

                        </View>
                     </View>
                  </View>
               }
               {getProductsFetching || !getProductsData
                  ? <View style={s?.preloader}><Preloader /></View>
                  : <View style={s?.itemsContainer}>
                     <FlatList
                        keyExtractor={(item: any) => item._id}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        contentContainerStyle={s?.itemsContainer}
                        data={getProductsData.products}
                        renderItem={_renderItem}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={footerLoader(getProductsFetching && loadMore)}
                     />
                  </View>

               }
            </ScrollView>

         </LinearGradient>
      </View>
   );
};

const MSellerScreen = memo(SellerScreen);
export { MSellerScreen as SellerScreen };