import _ from 'lodash';
import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import { Picker } from "@react-native-picker/picker";

import { Header } from './../../ui/components/Header';
import { createStyle } from './ProductInfoScreenStyles';
import { useThemeContext } from '~/ui/theme';
import { colors, gradients } from './../../ui/theme/default/colors';
import { ProductDescription } from './../../ui/components/ProductDescription';
import { SizePicker } from './../../ui/components/SizePicker';
import { ReviewItem } from './../../ui/components/ReviewItem';
import { useSelect } from '~/Hooks/useSelect';
import { SimpleSwiper } from '~/ui/components/SimpleSwiper/SimpleSwiper';
import { BaseItem } from '~/ui/components/BaseItem';
import { RenderStars } from '~/ui/components/RenderStars/renderStars';
import { Button } from '~/ui/components/Button/Button';
import { navigationService } from '../NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductPayload, CartActions } from '~/logic/cart/CartRedux';
import FastImage from 'react-native-fast-image';
import { productActions, ReducersNameT } from '~/logic/product/ProductRedux';
import { productSelector } from '~/logic/product/ProductSelectors';
import CartIcon from '../MainScreen/assets/CartIcon';
import { ImageWithLoader } from '~/ui/components/ImageWithLoader/ImageWithLoader';
import { cartSelector } from '~/logic/cart/CartSelectors';
import { showError } from '~/logic/AlertService/AlertService';
import { UserActions } from '~/logic/user/UserRedux';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { metrics } from '~/ui/theme/default/metrics';
import { ModalForPicker } from '~/ui/components/ModalForPicker/ModalForPicker';
import ArrowDownIcon from '~/ui/components/OurDropdown/assets/arrowDown';

type ProductInfoScreenProps = { reducerName: ReducersNameT }

// const colorsType = [
//   { color: '#D2D1D1', picked: false, id: "0" }, { color: '#6766B5', picked: false, id: "1" }, { color: '#CD5050', picked: false, id: "2" },
//   { color: '#349138', picked: false, id: "3" }, { color: '#3EB8BF', picked: false, id: "4" }, { color: '#146E74', picked: false, id: "5" },
//   { color: '#364142', picked: false, id: "6" }, { color: '#FAE956', picked: false, id: "7" }, { color: '#F4406B', picked: false, id: "8" },
//   { color: '#F24E29', picked: false, id: "9" }, { color: '#F06E6E', picked: false, id: "10" }, { color: '#F85DCC', picked: false, id: "11" }
// ]

// const sizesType = [
//   { value: "35", picked: false, id: "0" }, { value: "36", picked: true, id: "1" }, { value: "37", picked: false, id: "2" }
// ]

const ProductInfoScreen: React.FC<ProductInfoScreenProps> = ({ reducerName }) => {

   const dispatch = useDispatch()
   const { t } = useTranslation()
   const { s } = useThemeContext(createStyle);

   const {
      getReviews: {
         data: reviewsData,
         fetching: reviewsFetching
      },
      getProductById: {
         data: currentProduct,
         fetching: productFetching
      }
   } = useSelector(productSelector)

   const {
      getCartList: {
         data: cartListData,
         fetching: cartListFetching
      },
      addProduct: {
         fetching: addProductFetching
      }
   } = useSelector(cartSelector)

   const [index, setindex] = useState(0)



   useEffect(() => {
      if (currentProduct) {
         dispatch(productActions.getReviews.request({ productId: currentProduct._id, index: `0` }))
      }
      return () => {
         dispatch(productActions.getReviews.success(undefined))
         //dispatch(productActions.getProductById.success(undefined))
      }
   }, [productFetching])

   //const isEmptyProduct = _.isEmpty(currentProduct)

   const sizes = currentProduct?.sizes ? currentProduct.sizes.map((value, id) => ({
      value,
      picked: false,
      id
   })) : []


   const prodColors = currentProduct?.colors ? currentProduct.colors.map((value, id) => ({
      value,
      picked: false,
      id
   })) : []

   //console.log(`prodColors`, prodColors)

   const colorsArr = useSelect(prodColors);
   const sizesArr = useSelect(sizes);
   //console.log(colorsArr.array)

   useEffect(() => {
      if (currentProduct?.category.requiredFields.sizes) {
         sizesArr.setArray(sizes)
      }
      if (currentProduct?.category.requiredFields.colors) {
         colorsArr.setArray(prodColors)
      }

   }, [currentProduct])

   //console.log(`sizesArr`, sizesArr)

   const pickerData: { label: string, value: `ruPost` | `pickup` | `` }[] = [
      { label: t(`addProduct.Post`), value: `ruPost` },
      { label: t(`addProduct.pickup`), value: `pickup` },
      { label: t(`Not selected`), value: `` }
   ]

   if (currentProduct ? !currentProduct.deliveryMethods.pickup : 0) delete pickerData[1]
   if (currentProduct ? !currentProduct.deliveryMethods.ruPost : 0) delete pickerData[0]


   //console.log(`pickerData`, pickerData)


   const [pickerValue, setPickerValue] = useState<{ value: `ruPost` | `pickup` | ``, label: string }>({ value: ``, label: t(`Not selected`) })

   const [sellerImageLoad, setsellerImageLoad] = useState(false)

   const onSellerImageLoad = () => {
      setsellerImageLoad(true)
   }

   const onSellerImageLoadEnd = () => {
      setsellerImageLoad(false)
   }

   //console.log(`sizesArr.array`, sizesArr.array)
   //console.log(`props.colors`, colorsArr.array)

   // const [like, setLike] = useState(false);

   const handleLike = () => {
      if (currentProduct) {

         if (reducerName) {

            dispatch(productActions.subscribe.request({
               productId: currentProduct._id,
               isFavorite: currentProduct.youSubscribed,
               reducerName
            }))
         }
         else {

            dispatch(productActions.subscribe.request({
               productId: currentProduct._id,
               isFavorite: currentProduct.youSubscribed,
            }))
         }

      }
   }


   const handleUpload = () => {
      console.log('uploaPress')
   }



   let color = 0
   let size = 0

   //console.log(`colorsArr.array`, colorsArr.array)
   // console.log(`sizesArr.array.`, sizesArr.array)

   colorsArr.array.map((c: any, idx: number) => {
      if (c.picked) {
         color = idx + 1
      }
   })


   sizesArr.array.map((c: any, idx: number) => {
      if (c.picked) {
         size = c.value
      }
   })


   const onBuyPress = () => {
      if (currentProduct) {

         const isInCart = cartListData ? cartListData!.products.filter(d => d.product._id === currentProduct._id).length > 0 : false

         // const isInCart = cartCheck?.includes(true)




         if (currentProduct.youOwner) {
            showError(`You owner of this product`, `Buy`)
         }
         else if (isInCart) {
            showError(`This product already in your cart`, `Buy`)
         }
         else {
            const payload: AddProductPayload = {
               productId: currentProduct._id,
               amount: 1,
               deliveryMethod: pickerValue.value as `ruPost` | `pickup`,
               color: color - 1,
               size
            }

            if (!color) {
               delete payload.color
            }

            if (!size) {
               delete payload.size
            }

            dispatch(CartActions.addProduct.request(payload))
         }
      }
   }

   const onShowMore = () => { // On press Show more reviews
      setindex(index + 15)
      if (currentProduct) {
         dispatch(productActions.getReviews.request({ productId: currentProduct._id, index: `${index + 15}` }))
      }
   }


   const onSellerPress = () => {
      if (currentProduct) {
         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'SellerScreen',
               passProps: { sellerId: currentProduct.seller._id },
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
   }

   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }

   const onCartPress = () => {
      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            name: 'CartScreen',
            passProps: {},
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

   const daysFromNow = (timeMS: number) => Math.floor((+new Date() - timeMS) / 86400000)

   const [pickerVisible, setpickerVisible] = useState(false)
   console.log('here', currentProduct)

   return (
      <LinearGradient style={s?.container} colors={gradients.g3}>
         <View style={s?.container}>
            <ModalForPicker valueArr={pickerData}
               visible={pickerVisible}
               setModalVisible={setpickerVisible}
               changeFunc={setPickerValue} />
            <Header
               headerTitle={t('product.product')}
               headerLeft={'arrow'}
               onPressBack={onBackPress}
               headerRight={<CartIcon onCartPress={onCartPress} count={cartListData?.products.length} />}
               headerTitleFontSize={17}
               borderBottomWidth={0}
            />

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
               {!currentProduct || productFetching
                  ? <View style={s?.productPreloader}><Preloader /></View>
                  : <>
                     <SimpleSwiper
                        handleLike={handleLike}
                        handleUpload={handleUpload}
                        like={currentProduct.youSubscribed}
                        imgList={currentProduct.photos.length ? currentProduct.photos : [currentProduct.mainPhoto]}
                     />
                     <View style={s?.box}>
                        <BaseItem
                           leftStyle={s?.clientPhoto}
                           rightStyle={s?.buyBtn}
                           marginTop={false}
                           left={
                              <ImageWithLoader
                                 onPhotoPress={onSellerPress}
                                 imageLoad={sellerImageLoad}
                                 onLoadStart={onSellerImageLoad}
                                 onLoadEnd={onSellerImageLoadEnd}
                                 source={currentProduct.seller.photo}
                                 photoStyle={s?.userPic} />
                           }
                           right={
                              !currentProduct.youOwner &&
                              (<Button disabled={(currentProduct.category.requiredFields.colors && currentProduct?.colors?.length > 0 && !color) || (currentProduct.category.requiredFields.sizes && !size) || !pickerValue.value || addProductFetching || cartListFetching}
                                 spinner={addProductFetching || cartListFetching}
                                 onPress={onBuyPress}
                                 title={t("product.buy")}
                                 color={colors.black}
                                 textColor={colors.white}
                              />)
                           }
                        >
                           <View style={s?.shortColumn}>
                              <Text style={s?.userNameText}>{`${currentProduct.seller.fn} ${currentProduct.seller.ln}`}</Text>
                              <View style={s?.starsContainer}>
                                 <RenderStars rating={currentProduct.seller.rating} />
                              </View>
                           </View>
                        </BaseItem>
                     </View>

                     <ProductDescription
                        productCategory={currentProduct.category.name}
                        productName={currentProduct.name}
                        productDescription={currentProduct.description}
                     />
                     {/* <View style={s?.fullWidthWhiteContainer}>
          <TimeLeftIndicator
            timeLeft={72000}
          />
        </View>
        <BuyNowButton
          productPriceCurrency={'$'}
          productPriceDefault={'32'}
          productPriceGroup={'24'}
          groupCountFrom={'14'}
          groupCountTo={'20'}
          height={60}
          onBuyDefaultPressed={() => console.log('buy def')}
          onBuyGroupPressed={() => console.log('buy group')}
        /> */}
                     {currentProduct?.colors?.length > 0 && currentProduct.category.requiredFields.colors
                        ? <View style={[s?.containerWithBorder, s?.paddingx4]}>
                           <Text style={s?.uppercaseText}>
                              {t('product.color')}
                           </Text>
                           <View style={s?.colorsContainer} >
                              {colorsArr.array.map((item: any, idx: number) => {
                                 return (              //change to images color
                                    <TouchableOpacity key={item.id} onPress={() => colorsArr.selectOne(item.id)}
                                       style={[s?.colorsBox,
                                       {
                                          borderWidth: item.picked ? 1 : 0
                                       },
                                       idx === 0 ? { marginLeft: 0 } : {}
                                       ]}
                                    >
                                       <FastImage style={s?.colorPhoto} source={{ uri: item.value.photo }} />
                                    </TouchableOpacity>
                                 )
                              })}

                              {/* <ColorPicker
                                 items={colorsArr.array}
                                 onItemSelect={colorsArr.selectOne}
                              /> */}
                           </View>

                        </View>
                        : null}
                     {currentProduct.category.requiredFields.sizes
                        ? <View style={[s?.containerWithBorder, s?.paddingx4]}>
                           <Text style={s?.uppercaseText}>
                              {t('product.size')}
                           </Text>
                           <SizePicker
                              items={sizesArr.array}
                              onItemSelect={sizesArr.selectOne}
                           />
                        </View>
                        : null}
                     <View style={s?.footer}>
                        <View style={{ flexDirection: `row` }}>
                           <Text style={s?.footerText}>
                              {t(`product.delilivery`)}
                           </Text>
                           <Text style={s?.starText}>*</Text>
                        </View>
                        <TouchableOpacity onPress={() => setpickerVisible(!pickerVisible)} style={s?.pickerWrapper}>

                           <Text style={s?.picker}>{pickerValue.label}</Text>
                           <ArrowDownIcon stroke={colors.mainBlue} />
                        </TouchableOpacity>
                     </View>
                  </>
               }
               {!reviewsData || reviewsFetching
                  ? <View style={s?.reviewsPreloader}><Preloader /></View>
                  : reviewsData?.reviews.length > 0
                     ? (
                        <>
                           <View style={[s?.widthSpaceBetween, s?.reviewsLabel]}>
                              <Text style={s?.uppercaseText}>
                                 {t('reviews.review')}
                              </Text>
                              <Text style={s?.uppercaseText}>
                                 {reviewsData?.reviews.length}
                              </Text>
                           </View>
                           {reviewsData?.reviews.map(r => (
                              <ReviewItem
                                 key={r._id}
                                 photo={r.fromUser.photo}
                                 userName={`${r.fromUser.fn} ${r.fromUser.ln}`}
                                 userCity={'-'}
                                 rate={r.grade}
                                 dateText={daysFromNow(r.apperDate * 1000) < 1 ? t(`reviews.today`) : `${daysFromNow(r.apperDate * 1000)} ${t('day ago')}`}
                                 reviewText={r.text}
                              // like={like}
                              // comment={false}
                              // likeCount={'4'}
                              // commentCount={'2'}
                              // onPressLike={() => setLike(!like)}
                              />
                           ))}
                           {reviewsData.reviews.length % 15 === 0
                              ? <Button
                                 onPress={onShowMore}
                                 title={t("reviews.more")}
                                 color={colors.lightGray2}
                                 textColor={colors.black}
                                 borderWidth={0.5}
                              />
                              : null
                           }
                        </>
                     )
                     : null
               }
               <View style={{ marginTop: metrics.x5, opacity: 0 }} />
            </ScrollView>
         </View>
      </LinearGradient >
   );
};

const MProductInfoScreen = memo(ProductInfoScreen);
export { MProductInfoScreen as ProductInfoScreen };