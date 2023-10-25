import React, { useState, useCallback } from "react";
import { Text, View, ImageSourcePropType, TouchableOpacity } from "react-native";
import { createStyle } from './CartItemStyles';
import { useThemeContext } from '~/ui/theme';
import { Checkbox } from '~/ui/components/Checkbox';
import { colors } from "~/ui/theme/default/colors";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentActions } from '~/logic/payment/PaymentRedux';
import { paymentSelector } from '~/logic/payment/PaymentSelectors';
import { ColorsType } from "~/logic/profile/ProfileRedux";
import { ImageWithLoader } from "../ImageWithLoader/ImageWithLoader";
import FastImage from "react-native-fast-image";
import { CurrencyT, SymbCurrencyT } from "~/logic/product/ProductRedux";
import { userSelector } from "~/logic/user/UserSelectors";
import { defineCurrency, definePrice } from "~/ui/renderHelpers/defineCurrency";

export const HEIGHT = 95;


export interface ItemModel {
   idx: number;
   minSize: number;
   maxSize: number;
   price: number;
   productColorsArray?: ColorsType;
   productName: string;
   productImage: ImageSourcePropType;
   currentCurrency: SymbCurrencyT

}

interface ItemLayoutProps {
   item: ItemModel;
   borderBottom: boolean;
   passiveMode: boolean;
   onCheckPress?: (...args: any) => void
   isChecked?: boolean
   onItemPress?: () => void
}

const ItemLayout = ({
   item: {
      idx,
      productImage,
      productName,
      minSize,
      maxSize,
      price,
      productColorsArray,
      currentCurrency
   },
   borderBottom,
   passiveMode,
   isChecked,
   onCheckPress,
   onItemPress }: ItemLayoutProps) => {

   const {
      productsToOrder
   } = useSelector(paymentSelector);


   const dispatch = useDispatch();
   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const [imageLoad, setimageLoad] = useState(false)
   const onImageLoad = useCallback(() => {
      setimageLoad(true)
   }, [])

   const onImageLoadEnd = useCallback(() => {
      setimageLoad(false)
   }, [])


   const handleCheck = () => {
      let newProductsToOrder = [...productsToOrder];
      if (checkMatch() === false) {
         newProductsToOrder.push(idx)
      } else {
         let indexToDelete = -1;
         for (let i = 0; i < newProductsToOrder.length; i++) {
            if (newProductsToOrder[i] === idx) {
               indexToDelete = i;
            }
         }
         newProductsToOrder.splice(indexToDelete, 1);
      }
      dispatch(PaymentActions.updateProductsToOrder(newProductsToOrder))
   }

   const checkMatch = () => productsToOrder.includes(idx)



   const renderColors = (picsArray: { name: string, photo: string }[]) => {
      //console.log(picsArray)
      let indents = [];
      if (typeof productColorsArray !== "string") {
         let countOfPics = picsArray.length >= 3 ? 3 : picsArray.length;
         for (let i = 0; i < countOfPics; i++) {
            //console.log(`picsArray[${i}]`, picsArray[i])
            if (picsArray[i].photo.includes(`http://`) || picsArray[i].photo.includes(`https://`)) {
               indents.push(
                  <View key={i} style={[
                     s?.colorPreviewContainer,
                     {
                        zIndex: 3 - i, marginLeft: i > 0 ? -7 : 1
                     }
                  ]}>
                     <FastImage source={{ uri: picsArray[i].photo }} style={s?.colorImage} />
                  </View>
               );
            }
         }
      } else {
         indents.push(
            <Text style={s?.blackTextSmall}>{productColorsArray}</Text>
         );
      }
      return indents;
   }

   //console.log(productImage)

   return (
      <TouchableOpacity
         onPress={onItemPress}
         style={[s?.content, {
            borderBottomWidth: borderBottom === true ? 1 : 0
         }]}>
         <View style={s?.picContainer}>
            <ImageWithLoader
               imageLoad={imageLoad}
               onLoadStart={onImageLoad}
               onLoadEnd={onImageLoadEnd}
               source={productImage.uri} photoStyle={s?.productImageStyles}
               photoContainerStyle={s?.productImageStyles} />
         </View>
         <View style={s?.infoContainer}>
            <View style={[s?.spaceBetweenRow]}>
               <Text style={s?.productNameText}>
                  {productName}
               </Text>
               {passiveMode === false &&
                  <Checkbox
                     onPress={onCheckPress ? onCheckPress : handleCheck}
                     size={22}
                     isChecked={typeof isChecked === "undefined" ? checkMatch() : isChecked}
                     borderColor={colors.lightGray}
                     checkedColor={colors.lightBlue2}
                     circle={true}
                     borderWidth={1}
                  />
               }
            </View>
            {!!minSize && <View style={[s?.spaceBetweenRow]}>
               <View style={s?.row}>
                  <Text style={s?.grayLabel}>
                     {t('size') + ': '}
                  </Text>
                  <Text style={s?.blackSmallText}>
                     {minSize + '-' + maxSize}
                  </Text>
               </View>
            </View>}
            <View style={[s?.spaceBetweenRow]}>
               {productColorsArray && productColorsArray.length !== 0 ? <View style={s?.row}>
                  {/* <Text style={s?.grayLabel}>
                     {t('addProduct.color') + ': '}
                  </Text> */}
                  {renderColors(productColorsArray)}
                  {productColorsArray.length > 3 && typeof productColorsArray !== "string" &&
                     <Text style={s?.blackTextSmall}>+{productColorsArray.length - 3}</Text>
                  }
               </View>
                  : <View />}
               <View style={s?.row}>
                  <Text style={s?.priceText}>{`${price.toString().replace(`.`, `,`)}${currentCurrency}`}</Text>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   );
};

export default ItemLayout;
