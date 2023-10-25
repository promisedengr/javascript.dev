import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
   Image, Text,
   TouchableOpacity,
   View
} from 'react-native';
import { Source } from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { usePriceDefine } from '~/Hooks/usePriceDefine';

import { productSelector } from '~/logic/product/ProductSelectors';
import { ColorsType } from '~/logic/profile/ProfileRedux';
import { userSelector } from '~/logic/user/UserSelectors';
import { defineCurrency, definePrice, reverseDefineCurrency } from '~/ui/renderHelpers/defineCurrency';
import { useThemeContext } from '~/ui/theme';
import { metrics } from '~/ui/theme/default/metrics';
import { theme } from '~/ui/theme/default/theme';
import { ImageWithLoader } from '../ImageWithLoader/ImageWithLoader';
import { RenderStars } from '../RenderStars/renderStars';
import EmptyFavorite from './assets/emptyFavorite';
import Favorite from './assets/favorite';
import PenIcon from './assets/PenIcon';
import { createStyle } from './ProductItemStyles';



export type ProductItemProps = {
   productID: string;
   productName: string;
   productImage: Source;
   sellerImage: Source;
   productCategory: string;
   productRating: number;
   productFollowers: number;
   productColorsArray?: ColorsType;
   productSizeMin: number;
   productSizeMax: number;
   productPriceCurrency: `$` | `₽`
   productPriceDefault?: string;
   productPriceGroup: string;
   favorite: boolean;
   newProduct?: boolean;
   timeLeft?: number;
   onPressFavorite?(id: string, favorite: boolean): void;
   onItemSelect: (productId: string) => void;
   onEditPress?: (...args: any) => void
   youOwner?: boolean
   isAdmin?: boolean
   onAcceptPress?: (productId: string) => void
   onDeclinePress?: (productId: string) => void
   onSellerPress: (productId: string) => void
   sellerId: string
   isRequiredSizes?: boolean
   isRequiredColors?: boolean

};

const ProductItem: React.FC<ProductItemProps> = ({
   productID,
   productName,
   productImage,
   sellerImage,
   productCategory,
   productRating,
   productFollowers,
   productColorsArray,
   productSizeMin,
   productSizeMax,
   productPriceCurrency,
   productPriceDefault,
   productPriceGroup,
   favorite,
   newProduct,
   timeLeft,
   onPressFavorite,
   onItemSelect,
   onEditPress,
   youOwner = false,
   isAdmin = false,
   onAcceptPress,
   onDeclinePress,
   onSellerPress,
   sellerId,
   isRequiredSizes,
   isRequiredColors
}) => {

   const { s } = useThemeContext(createStyle)
   const { t } = useTranslation();

   const {
      approveProduct: {
         fetching: approveFetching
      }
   } = useSelector(productSelector)

   const {
      currentCurrency
   } = useSelector(userSelector)


   const [imageLoad, setimageLoad] = useState(false)
   const [sellerImageLoad, setsellerImageLoad] = useState(false)

   const onImageLoad = useCallback(() => {
      setimageLoad(true)
   }, [])

   const onImageLoadEnd = useCallback(() => {
      setimageLoad(false)
   }, [])

   const onSellerImageLoad = useCallback(() => {
      setsellerImageLoad(true)
   }, [])


   const onSellerImageLoadEnd = useCallback(() => {
      setsellerImageLoad(false)
   }, [])

   // const [timer, setTimer] = useState(!!timeLeft ? timeLeft : 0);

   // useEffect(() => {
   //       if (timer > 0) {
   //          setTimeout(() => {
   //             let newTime = Math.round(timer - 1);
   //             setTimer(newTime);
   //          }, 1000);
   //       }
   //    }, [timer]
   // );

   // const convertTime = (allSeconds: number) => {
   //    let stringTime = new Date(allSeconds * 1000).toISOString().substr(11, 8);
   //    return stringTime;
   // }




   // const renderStars = (rating: number) => {
   //     let indents = [];
   //     for (let i = 0; i < 5; i++) {
   //         if (i < rating) {
   //             indents.push(
   //                 <View style={s?.starIconMargin}>
   //                     <Star w={18} h={18} />
   //                 </View>
   //             );
   //         } else {
   //             indents.push(
   //                 <View style={s?.starIconMargin}>
   //                     <EmptyStar w={18} h={18} />
   //                 </View>
   //             );
   //         }
   //     }
   //     return indents;
   // }

   const currencyPriceFormat = usePriceDefine()



   const renderColors = (picsArray: ColorsType) => {
      let indents = [];
      if (typeof productColorsArray !== "string" && picsArray) {
         let countOfPics = picsArray.length >= 3 ? 3 : picsArray.length;
         for (let i = 0; i < countOfPics; i++) {
            indents.push(
               <View key={i} style={[
                  s?.colorPreviewContainer,
                  {
                     zIndex: 3 - i, marginLeft: i > 0 ? -7 : 1
                  }
               ]}>
                  <Image source={{ uri: picsArray[i].photo }} style={s?.colorImage} />
               </View>
            );
         }
      } else {
         indents.push(
            <Text key={`text`} style={s?.blackTextSmall}>{productColorsArray}</Text>
         );
      }
      return indents;
   }





   return (
      <TouchableOpacity style={s?.container} onPress={() => onItemSelect(productID)}>
         <View style={s?.top}>
            <ImageWithLoader imageLoad={imageLoad}
               onPhotoPress={() => onItemSelect(productID)}
               onLoadStart={onImageLoad}
               onLoadEnd={onImageLoadEnd}
               source={productImage.uri}
               photoContainerStyle={s?.productImageStyles} />
            <View style={s?.sellerImageContainer}>
               <ImageWithLoader imageLoad={sellerImageLoad}
                  onPhotoPress={() => onSellerPress && onSellerPress(sellerId)}
                  onLoadStart={onSellerImageLoad}
                  onLoadEnd={onSellerImageLoadEnd}
                  source={sellerImage.uri}
                  photoStyle={s?.sellerImageStyles}
                  photoContainerStyle={s?.sellerImageStyles}
               />
            </View>
            {((!isAdmin && (onEditPress || (onPressFavorite && !youOwner)))
               ? (<TouchableOpacity style={s?.favoriteContainer}
                  onPress={() => (onEditPress ? onEditPress() : onPressFavorite!(productID, favorite))}>
                  <View style={s?.favoriteIconContainer}>
                     {!youOwner && !onEditPress
                        ? (!favorite
                           ? <EmptyFavorite w={16} h={14} />
                           : <Favorite color={theme.colors.lightBlue2} w={16} h={14} />)
                        : <PenIcon />}

                  </View>
               </TouchableOpacity>)
               : null
            )

            }
            {/* {newProduct &&
               <View style={s?.newLabelContainer}>
                  <Text style={s?.newText}>new</Text>
               </View>
            }
            {timeLeft &&
               <View style={s?.timeLeftContainer}>
                  <Text style={s?.newText}>{convertTime(timer)}</Text>
               </View>
            } */}
         </View>
         <View style={s?.bottom}>
            <View style={{
               paddingHorizontal: metrics.x,
            }}>
               <View style={s?.starsContainer}>
                  <RenderStars rating={productRating} />
                  <Text style={s?.reviewsNumberText}>({productFollowers})</Text>
               </View>
               <Text style={s?.productCategoryText}>{productCategory}</Text>
               <Text style={s?.productNameText}>{productName}</Text>
               <View style={s?.optionsContainer}>
                  <View style={[s?.optionsColumn, s?.optionsColumnMargin]}>
                     <View style={[s?.optionsRow, (!isRequiredColors || !productColorsArray?.length) ? { opacity: 0 } : {}]}>
                        <Text style={s?.productGrayText}>{`${t(`Color`)}:`}</Text>
                        {renderColors(productColorsArray!)}
                        {productColorsArray
                           && typeof productColorsArray !== "string"
                           && productColorsArray.length > 3
                           && <Text style={s?.blackTextSmall}>+{productColorsArray.length - 3}</Text>
                        }
                     </View>
                     {/* <View style={[s?.optionsRow, s?.secondRowMargin]}>
                                <UserIcon w={12} h={16}/>
                             <Text style={s?.currencyText}>{productPriceCurrency}</Text>
                            <Text style={s?.priceText}>{productPriceDefault}</Text>
                        </View> */}
                  </View>
                  <View style={[s?.optionsColumn, !isRequiredSizes ? { opacity: 0 } : {}]}>
                     <View style={s?.optionsRow}>
                        <Text style={s?.productGrayText}>{`${t(`Size`)}:`}</Text>
                        <Text style={s?.blackTextSmall}>{productSizeMin === productSizeMax ? productSizeMin : `${productSizeMin}-${productSizeMax}`}</Text>
                     </View>
                     {/* <View style={[s?.optionsRow, s?.secondRowMargin]}>
                                <UsersIcon w={12} h={14}/>
                             <Text style={s?.currencyText}>{productPriceCurrency}</Text>
                             <Text style={s?.priceText}>{productPriceGroup}</Text> 
                            </View> */}
                  </View>
               </View>
            </View>
            {isAdmin && onAcceptPress && onDeclinePress
               ? (
                  <View style={s?.acceptDeclineBut}>
                     <TouchableOpacity
                        onPress={approveFetching ? () => { } : () => onAcceptPress(productID)}
                        style={[s?.priceButton, s?.acceptButton, approveFetching ? s?.disabledButton : {}]}>
                        <Text style={s?.acceptText}>
                           {t(`Accept`)}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={approveFetching ? () => { } : () => onDeclinePress(productID)}
                        style={[s?.priceButton, s?.declineButton, approveFetching ? s?.disabledButton : {}]}>
                        <Text style={s?.acceptText}>
                           {t(`Decline`)}
                        </Text>
                     </TouchableOpacity>
                  </View>
               )
               : (
                  <View style={s?.priceButton}>

                     <Text style={s?.priceText}>{
                        currencyPriceFormat({ currency: reverseDefineCurrency(productPriceCurrency), price: +productPriceGroup }).toString().replace(`.`, `,`)
                     }
                     </Text>
                     <Text style={s?.priceText}>{defineCurrency(currentCurrency)}</Text>
                  </View>
               )
            }

         </View>
      </TouchableOpacity>
   );
};

ProductItem.defaultProps = {
   favorite: false,
   newProduct: false
}


const ProductItemM = memo(ProductItem);
export { ProductItemM as ProductItem };
